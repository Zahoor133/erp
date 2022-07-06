const Empdata = require('../model/empSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../secret.json')



const RegisternewEmp =   async (req, res) => {
    try {
        const addEmprecord = new Empdata(req.body) 
         const insertEmprecord = await  addEmprecord.save()
         res.send(" Employee Inserted Successfully" + insertEmprecord)
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}

const loginEmployee= async (req,res) =>{
    Empdata.find({emai: req.body.email})
    .exec()
    .then(empdata =>{
        if(empdata.length < 1){
            return res.status(404)
        }
        bcrypt.compare(req.body.password,empdata[0].password,(err,isEqual)=>{
           if(err) return res.status(401);
           
               
                if(isEqual){
                    const token = jwt.sign({
                        email: empdata[0].email,
                        empId: empdata[0]._id
                    },
                    secret.key,
                    {
                        expiresIn: '1h'
                    }
                    )
                    return res.status(200).json({
                        message:"Authorization Successful",
                        token: token
                    })
                }
                res.status(401)
            
        })
    })
    .catch (err =>{
        console.log(err)
        res.status(500).json({
            error:err
            
        })
    })
}
   
module.exports = {
    RegisternewEmp,
    loginEmployee,
    
}