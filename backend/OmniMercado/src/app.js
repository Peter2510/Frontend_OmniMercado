const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()

app.use(express.json({limit:'5mb'}))
app.use(cors({origin:'http://127.0.0.1:4200'}))

app.get('/',(req,res)=>{
    res.json({message:'Hola mundo'})
})


module.exports = app