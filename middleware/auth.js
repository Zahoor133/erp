const jwt = require('jsonwebtoken');
const { model } = require('mongoose');
const secret = require('../secret.json');
const adminData = mongoose.model('adminSchema')

module.exports = (req, res, next) => {
const {authorization} = req.headers
if(!authorization){
    return res.status(401).json({error: "Please Log in"})
}
const token = authorization.replace("Bearer ", "")
jwt.verify(token, secret.key,(error,payload)=> {
    if(error){
        return res.status(401).json({error: "Please log in"})
    }
    const {id}= payload
    adminData.findById(id).then(admindata => {
        req.adminData = admindata
        next()
    })
})



/*
    try {
        const token = req.headers.authorization.split(" ")[1];
        console.log(token)
        const decoded = jwt.verify(token, secret.key);
        req.userData = decoded;
        next();
        
    } catch (error) {
        return res.sendStatus(401)
        
    }

  */
}