const express = require('express')
const stuRouter = new express.Router()

const { RegisternewStu, loginStudent, } = require('../controller/studentController.js')

//get students
stuRouter.post('/signup',RegisternewStu)  
stuRouter.post('/login', loginStudent)    


module.exports = stuRouter;


