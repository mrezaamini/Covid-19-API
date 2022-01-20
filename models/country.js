//country model
const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
    country:{
        type:String,
        required:true,
        min:3,
        max:30
    },
    todayCases:{
        type:Number,
        min:0,
        required:true,
        default:0

    },
    todayDeaths:{
        type:Number,
        min:0,
        required:true,
        default:0
    },
    todayRecovered:{
        type:Number,
        min:0,
        required:true,
        default:0
    },
    critical:{
        type:Number,
        min:0,
        required:true,
        default:0
    },
    admins:{ // to keep admins ids
        type: [String],
        required: true,
        default: []
    }
})

module.exports = mongoose.model('CountrySchema', countrySchema)