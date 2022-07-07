const express = require('express')
const salRouter = new express.Router()
const checkAuth = require('../middleware/auth')


const {createSalaryDataForEmployee } = require('../controller/salaryController.js')


     salRouter.post('/salary', checkAuth, createSalaryDataForEmployee)
   
  

    module.exports = salRouter;
