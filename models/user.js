//admin users model
const { string } = require('joi')
const mongoose = require('mongoose')

 
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        min:3 
    },
    password:{
        type:String,
        required:true,
        min:5
    },
    role:{
        type:String,
    }

})

module.exports = mongoose.model('UserSchema', userSchema)