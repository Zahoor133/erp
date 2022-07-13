
const express = require('express')          //hi
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

//Defining the StudentSchema
const studentSchema = new mongoose.Schema({
    studentId: {
        type: Number,
        required: [true, 'studentid is requuired'],
        unique: [true, 'id Already Exist'],
    },
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
   /*  previous_Marks:{
        type:Number
    }, */
    password: {
        type: String,
        required: true,
        validate(value) {
            if (value.length < 8) {
                throw new Error('Password must be 8 characters long')
            }
        }
    }
    
    
  },
{timestamps : true}
)

//password hashing schema-middleware on mongoose before saving password

studentSchema.pre('save', async function (next) {
    const student = this

    if (student.isModified('password')) {
        student.password = await bcrypt.hash(student.password, 8)
    }
    next()
})

studentSchema.methods.removesenSitivestudentFields = async function () {
    const student = this
    //clone object
    const studentObject = student.toObject()   
    delete studentObject.password

    return studentObject
}

studentSchema.statics.findByCredentials = async (email, password) => {
    //static object gives us access to the model itself
    const student = await student.findOne({ email })


    if (!student.email) {
        throw new Error('incorrect email or password')
    }
    const isValid = await bcrypt.compare(password, student.password)

    // bcrypt.compare()  will take two arguments first is the password from the 
    //req body which is the plain password and second will be student.password  which is the hashed password 

    //this will compare the plain password with the hashed password and if it is a match it will return true otherwise false
    if (!isValid) {
        throw new Error('incorrect email or password')
    }
    return student.removesenSitivestudentFields()
}

const stuRegister = new mongoose.model('stuRegister', studentSchema)

module.exports = stuRegister














