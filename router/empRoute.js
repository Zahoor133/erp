const express = require('express')
const empRouter = new express.Router()

const { RegisternewEmp, loginEmployee, } = require('../controller/empController.js')



//get employees
empRouter.post('/signup',RegisternewEmp)
empRouter.post('/login', loginEmployee)


module.exports = empRouter;