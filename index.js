const express = require('express')
const router = require('./Routes/auth')
const app = express()

const mongoose = require('mongoose')

//routes
const authRoute = require('./routes/auth')
const publicRoute = require('./routes/public')
const adminRoute = require('./routes/admin')

//DB connection 
//mongoose.connect('mongodb+srv://cov19admin:<cov19admin>@cluster0.cqjgk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
//,{useNewUrlParser:true},()=>console.log('connected to DB'))

mongoose.connect('mongodb://localhost/admin'
,{useNewUrlParser:true},()=>console.log('connected to DB'))

//midllewares
app.use(express.json())
app.use('/',authRoute)
app.use('/countries',publicRoute)
app.use('/admin',adminRoute)

app.listen(3000, ()=> console.log('Server Is Running'))