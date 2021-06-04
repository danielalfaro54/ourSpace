const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

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


module.exports = router