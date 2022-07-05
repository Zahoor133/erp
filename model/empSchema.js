const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Defining the EmployeeSchema
const employeeSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required:[true,'Name is Required']  ,
        uppercase: true },
    address: {
        city: { type: String, required: [true, 'City is required'] },
        country:{type: String, required: [true, 'Country is required']},
        street: { type: String, require: [true, 'Street is required'] },
        pincode: { type: Number, require: [true, 'pincode is required'] }
    },
    age: {
         type: Number, 
         require: true,
          min: 1, 
          max: 100 },
    gender: {
         type: String, 
         required: true, 
         enum:{
            values:["male","female"],
        message: "Gender should be either male or female"} },
    email: {
        type: String,
        unique: [true, 'Email Already Email'],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
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
    // confirmpassword: { type: String, require: true },
   // phone: { type: Number, required: true,min:10,max:16, unique: true },
    salary: { type: Number },
   // updated_at: { type: Date, default: Date.now },
    
},
{timestamps : true}
)

//password hashing schema-middleware on mongoose before saving password

employeeSchema.pre('save', async function (next) {
    const employee = this

    if (employee.isModified('password')) {
        employee.password = await bcrypt.hash(employee.password, 8)
    }
    next()
})

employeeSchema.methods.removesenSitiveemployeeFields = async function () {
    const employee = this
    //clone object
    const employeeObject = employee.toObject()
    delete employeeObject.password

    return employeeObject
}

employeeSchema.statics.findByCredentials = async (email, password) => {
    //static object gives us access to the model itself
    const employee = await employee.findOne({ email })


    if (!employee.email) {
        throw new Error('incorrect email or password')
    }
    const isValid = await bcrypt.compare(password, employee.password)

    // bcrypt.compare()  will take two arguments first is the password from the 
    //req body which is the plain password and second will be employee.password  which is the hashed password 

    //this will compare the plain password with the hashed password and if it is a match it will return true otherwise false
    if (!isValid) {
        throw new Error('incorrect email or password')
    }
    return employee.removesenSitiveEmployeeFields()
}

const Register = new mongoose.model('Register', employeeSchema)

module.exports = Register














