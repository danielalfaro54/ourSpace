const express = require('express');
const router = express.Router();

router.get('/',(req,res) =>{
    res.send('HELLO WRLD')
})
router.post('/signup',(req,res)=>{

    const {name,email,password} = req.body
    //console.log(req.body.name);
})

module.exports = router