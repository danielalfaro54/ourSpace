const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require("../valuekeys.js")
const mongoose = require('mongoose');
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;
    if(!authorization){
        res.status(401).json({error:"you must be logged first man"});

    } 
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
           return res.status(401).json({error:'you must be logged first dude - JWT err'});
        }
        const {_id} = payload
        User.findById(_id).then(userdata=>{
            req.user = userdata
            next()
        })
    })
}