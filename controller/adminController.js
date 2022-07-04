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
  
    AdminData.find({email: req.body.email})
    .exec()
    .then(adminData => {
        if(adminData.length < 1){
            return res.sendStatus(404);

        }
        bcrypt.compare(req.body.password, adminData[0].password, (err, isEqual) => {
            if(err) return res.sendStatus(401);
            if(isEqual){
                //create a token
               const token = jwt.sign(
                {
                    email: adminData[0].email,
                    userId: adminData[0]._id
                },
                secret.key,{
                    expiresIn: '1h'
                }
               ) 

               return res.status(200).json({
                message: "Authorization Successful",
                token: token
               })
            }
            res.sendStatus(401)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

}



module.exports = {
    registrationAdmin,
    loginAdmin,
}