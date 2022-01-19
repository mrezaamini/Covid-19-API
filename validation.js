//Functions for Validations
const Joi = require('Joi')


//Admin Username & Password Validation 
const adminUserPass_validation = (newAdmin) =>{
    const adminSchema = Joi.object({
        adminUsername: Joi.string().min(3).required(),
        adminPassword: Joi.string().min(5).required()
    })
    return adminSchema.validate(newAdmin)
    
}
//newCountry validation (only name is important)
const newCountry_validation = (newCountry) =>{
    const countrySchema = Joi.object({
        countryName:Joi.string().min(3).max(30).required()
    })
    return countrySchema.validate(newCountry)
}

//validate sort query
const sortQuery_validation = (sortQuery) =>{
    const sortQuerySchema = Joi.object({
        sort:Joi.string().valid('todayCases','todayRecoverd','todayDeaths')
    })
    return sortQuerySchema.validate(sortQuery)
}
module.exports.adminUserPass_validation = adminUserPass_validation
module.exports.newCountry_validation = newCountry_validation
module.exports.sortQuery_validation = sortQuery_validation