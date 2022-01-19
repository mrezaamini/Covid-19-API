const router = require('express').Router()
const UserSchema = require('../models/user')
const {adminUserPass_validation} = require('../validation')

router.delete('/admin', async(req,res)=>{
    const deleted = await UserSchema.deleteMany();
})

router.get('/admin', async(req, res)=>{
    const admins = await UserSchema.find();
    res.json(admins)
})

router.post('/admin', async (req, res)=>{
    //validate new admin username and password
    const {error} = adminUserPass_validation(req.body)
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

router.post('/countries/:countryName', (req, res)=>{
    res.send(`make new empty country ${req.params.countryName}`)
})

router.put('/countries/:countryName',(req, res)=>{
    res.send(`change permissions ${req.params.countryName}`)
})

module.exports = router