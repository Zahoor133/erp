const AdminData = require('../model/adminSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../secret.json')



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
    const {email, password} = req.body;
    AdminData.findOne({email: email})
    .then(savedAdmin => {
        if(!savedAdmin)
        return res.status(401).json({error: 'Invalid Credentials'})

        bcrypt.compare(password, savedAdmin.password, function(err, result){
            if(result)
            {
                const token = jwt.sign({id:savedAdmin.id}, secret.key)
                const {id,name,email} = savedAdmin
                return res.status(202).json({token, admin: {id,name,email}, message: "Logged In"})
            }
            else
            return res.status(401).json({error: "Invalid Credentials"})
        })
    })

}



module.exports = {
    registrationAdmin,
    loginAdmin,
}