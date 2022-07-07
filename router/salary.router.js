const express = require('express')
const salaryRouter = new express.Router()
const checkAuth = require('../middleware/auth')


const {createSalaryDataForEmployee } = require('../controller/salaryController.js')


     salaryRouter.post('/salary', checkAuth, createSalaryDataForEmployee)
   
  

    module.exports = salaryRouter;