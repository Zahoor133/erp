const express = require('express')
const router = new express.Router()


const { registrationAdmin,loginAdmin} = require('../controller/adminController.js')


     router.post('/login',  loginAdmin )
    router.post('/registration', registrationAdmin)
  

    module.exports = router;
    