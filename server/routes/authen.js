const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET}= require('../valuekeys');
const requireLogin = require('../middleware/requireLogin')

router.get('/',(req,res) =>{
    res.send('HELLO WRLD')
})
router.post('/signup',(req,res)=>{

    const {name,email,password} = req.body
    //console.log(req.body.name);
    if(!email || !password || !name){
    res.status(422).json({error:'You need to fill all the fields'});
    }
    User.findOne({email:email}).then((savedUser=>{
        if(savedUser){
            return res.status(422).json({error:'Email User already exists '});
        }
        bcrypt.hash(password,12).then(hashedpassword=>{
            const user = new User({
                email,
                password:hashedpassword,
                name
            })
            user.save().then(user=>{
                res.json({message:'User saved succesfully'})
                .catch(err=>{
                    console.log(err);
                })
        })

       
        })
    })).catch(err=>{
        console.log(err);
    })
    //res.json({message:'Your data was send! :)'})
})

router.get("/protected",requireLogin,(req,res)=>{
    res.send('hello user');
})

router.post('/signin',(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
       return res.status(422).json({error:"you have to add an email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
        return res.status(422).json({error:"Invalid email or password"})
    }
    bcrypt.compare(password,savedUser.password)
    .then(doMatch=>{
        if(doMatch){
           // res.json({message:"successfully signed in"});
           const token = jwt.sign({id:savedUser._id}, JWT_SECRET);
           res.json({token})
        }
        else{
            return res.status(422).json({error:"Invalid Email or password"})
        }
    }).catch(err=>{
        console.log(err)
    })
    })
})


module.exports = router