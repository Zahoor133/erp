const express = require('express')
const router = new express.Router()


const { RegisternewEmp, loginEmployee, } = require('../controllers/empController.js')



//get employees
router.post('/signup',RegisternewEmp)
router.post('/login', loginEmployee)


module.exports = router;