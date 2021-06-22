const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = 5000
const {MONGOURI} = require('./valuekeys.js')


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




app.listen(PORT,()=>{
    console.log('running', PORT)
})