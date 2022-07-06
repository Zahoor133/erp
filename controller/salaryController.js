
const SalaryData = require('../model/salarySchema.js')


const createSalaryDataForEmployee = async (req, res) => {
    try {
        const addSalaryData = new SalaryData (req.body) 
         const insertSalaryData= await  addSalaryData.save()
         res.send(" Data Inserted Successfully" + insertSalaryData)
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}

module.exports = {
    createSalaryDataForEmployee
}