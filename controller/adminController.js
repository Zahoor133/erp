const AdminData = require('../model/adminSchema.js')



const registrationAdmin =  async (req, res) => {
    try {
        const addAdminData = new AdminData (req.body) 
         const insertAdminData= await  addAdminData.save()
         res.send(" Data Inserted Successfully" + insertAdminData)
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}

const loginAdmin = async (req,res) =>{
    try{
       const ourAdminData = await AdminData.findByCredentials(req.body.email, req.body.password)

     res.send(ourAdminData)
   }catch(err){
       res.status(400).send(err.message)
    }

}



module.exports = {
    registrationAdmin,
    loginAdmin,
}