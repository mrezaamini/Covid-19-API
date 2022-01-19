const express = require('express')
const app = express()

const mongoose = require('mongoose')

//Routes
const publicRoute = require('./routes/public')
const superAdminRoute = require('./Routes/superAdmin')
const adminRoute = require('./routes/admin')

//DB connection 
mongoose.connect('mongodb://localhost/admin'
,{useNewUrlParser:true},()=>console.log('connected to DB'))

//midllewares
app.use(express.json())
app.use('/countries',publicRoute)
app.use('/',superAdminRoute)
app.use('/countries',adminRoute)

app.listen(3000, ()=> console.log('Server Is Running On Port 3000'))