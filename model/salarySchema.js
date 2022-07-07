
const mongoose = require('mongoose')

//salary Schema

const salarySchema = new mongoose.Schema({
  
    BasicSalary : { 
        type: String,
        required: true
    },
    BankName: { 
        type: String,
        required: true
    },
    AccountNo: {
        type: String, 
        required: true
    },
    IFSCcode: { 
        type: String,
        required: true
    }
   // empId:[ {
       // type:'employeeId', ref: 'Register'}]
})



const SalaryData = new mongoose.model('SalaryData', salarySchema)

module.exports = SalaryData