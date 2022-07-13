const Studata = require('../model/studentSchema.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = require('../secret.json')



const RegisternewStu =   async (req, res) => {
    try {
        const addSturecord = new Studata(req.body) 
         const insertSturecord = await  addSturecord.save()
         res.send(" Student Inserted Successfully" + insertSturecord)
        
    } catch (error) {
        res.status(400).send(error.message)
        
    }
}

const loginStudent= async (req,res) =>{
    Studata.find({emai: req.body.email})
    .exec()
    .then(studata =>{
        if(studata.length < 1){
            return res.status(404)
        }
        bcrypt.compare(req.body.password,studata[0].password,(err,isEqual)=>{
           if(err) return res.status(401);
           
               
                if(isEqual){
                    const token = jwt.sign({
                        email: studata[0].email,
                        stuId: studata[0]._id
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
    RegisternewStu,
    loginStudent,
    
}