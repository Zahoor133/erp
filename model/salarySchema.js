
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
    AccountHolderName: {
        type: String,
        required: true
    },
    IFSCcode: { 
        type: String,
        required: true
    },
    TexDeduction: { 
        type: String,
        required : true
    }
 
})



const SalaryData = new mongoose.model('SalaryData', salarySchema)

module.exports = SalaryData