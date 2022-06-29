
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Admin Schema

const adminSchema = new mongoose.Schema({
    fullname : {
        type : String,
        required: [true, 'Full Name Must Be Provide'],
        trim: true,
        unique: [true, "Name already exists"],
        uppercase: true
    },
    address : {
        city:{ 
            type: String,
            required: [true, 'City must be provided']},
        state:{  type: String,
            required: [true, 'State must be provided']},
        country: {
             type: String,
              required: [true, 'Country must be provided']},
        pincode:{
             type: Number,
             min: [6,'should be 6 digit'],
             required: [true, 'Pincode must be provided']},
        
    },
    age : {
        type : Number,
        min: [30, 'Age should above 30'],
        max: 100
    },
    contact: {
        type:Number,
        unique :[true, 'Number Alerdy Email'],
        required:[true, 'Contact number is must'],
        min:6
    },

  
    gender: {
        type: String,
        required: [true, 'Gender must be provided'],
        enum:{
            values: ["male", "female"],
             message: "Gender Should be male or female",
             }
       
    },
    designation: {
        type: String,
    },
    email: {
        type : String,
        unique :[true, 'Email Alerdy Email'],
        trim: true,
        lowercase: true,
        validate : {
            validator : function(v){
                return  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: 'Please enter a valid email'
        },
        required: [true, "Email required"]
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error('Password must be 8 characters long')
            }
        }
    },

})

//password hashing schema-middleware on mongoose before saving password

adminSchema.pre('save', async function (next) {
    const adminData = this

    if (adminData.isModified('password')) {
        adminData.password = await bcrypt.hash(adminData.password, 8)
    }
    next()
})

adminSchema.methods.removesenSitiveUserFields = async function(){
    const adminData = this
    
    const adminDataObject = adminData.toObject()
    delete adminDataObject.password

    return adminDataObject
}

adminSchema.statics.findByCredentials = async (email,password) => { 
     //static object gives us access to the model itself
    const adminData = await AdminData.findOne({ email})


    if (!adminData.email) {
        throw new Error('incorrect email or password')
    }
    const isValid = await bcrypt.compare(password, adminData.password)

     // bcrypt.compare()  will take two arguments first is the password from the 
     //req body which is the plain password and second will be user.password  which is the hashed password 

      //this will compare the plain password with the hashed password and if it is a match it will return true otherwise false
    if (!isValid) {
        throw new Error('incorrect email or password')
    }
    return adminData.removesenSitiveUserFields()
}

const AdminData = new mongoose.model('AdminData', adminSchema)

module.exports = AdminData