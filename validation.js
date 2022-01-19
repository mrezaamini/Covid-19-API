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

module.exports.adminUserPass_validation = adminUserPass_validation