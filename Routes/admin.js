const router = require('express').Router()
const UserSchema = require('../models/user')

//validate
const Joi = require('Joi')
const adminSchema = Joi.object({
    adminUsername: Joi.string().min(3).required(),
    adminPassword: Joi.string().min(5).required()
})


router.delete('/', async(req,res)=>{
    const deleted = await UserSchema.deleteMany();
})

router.get('/', async(req, res)=>{
    const admins = await UserSchema.find();
    res.json(admins)
})

router.post('/', async (req, res)=>{
    //validate new admin username and password
    const {error} = adminSchema.validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let admin = await UserSchema.findOne({ username: req.body.adminUsername });
    if (admin){
        return res.status(400).send('User already taken!');
    } 

    const user = new UserSchema({
        username:req.body.adminUsername,
        password:req.body.adminPassword
    })
    try{
        const savedAdmin = await user.save() 
        res.send(savedAdmin)
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports = router