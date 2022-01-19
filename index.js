const express = require('express')
const router = require('./Routes/auth')
const app = express()

//routes
const authRoute = require('./routes/auth')
const publicRoute = require('./routes/public')

//midllewares
app.use('/',authRoute)
app.use('/countries',publicRoute)
app.listen(3000, ()=> console.log('Server Is Running'))