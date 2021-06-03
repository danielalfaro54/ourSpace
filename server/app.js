const express = require('express');
const app = express()
const mongoose = require('mongoose');
const PORT = 5000
const {MONGOURI} = require('./valuekeys.js')


require('./models/user')

app.use(express.json())
app.use(require('./routes/authen'))

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




app.listen(PORT,()=>{
    console.log('running', PORT)
})