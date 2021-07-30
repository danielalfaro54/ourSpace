const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT||5000
const {MONGOURI} = require('./config/valuekeys.js')


mongoose.connect(MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
    console.log('CONNECTED TO MONGO DB')
})
mongoose.connection.on('error',()=>{
    console.log('NOT CONNECTED TO MONGO DB')
})
require('./models/user')
require("./models/post")
app.use(express.json())
app.use(require('./routes/authen'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res) => {
        res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html'))
    })
}



app.listen(PORT,()=>{
    console.log('running', PORT)
})