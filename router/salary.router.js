const express = require('express')
const router = new express.Router()
const checkAuth = require('../middleware/auth')


const {createSalaryDataForEmployee } = require('../controller/salaryController.js')


     router.post('/salary', checkAuth, createSalaryDataForEmployee)
   
  

    module.exports = router;