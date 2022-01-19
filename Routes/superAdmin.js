//What SuperAdmins Do
const router = require('express').Router()
const UserSchema = require('../models/user')
const CountrySchema = require('../models/country')
const {adminUserPass_validation, newCountry_validation} = require('../validation')

router.delete('/admin', async(req,res)=>{ //to check db
    const deleted = await UserSchema.deleteMany();
})

router.get('/admin', async(req, res)=>{ // to check db
    const admins = await UserSchema.find();
    res.json(admins)
})
//Make new admin with username and password
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

// Make new country with initial value of all cases equal to 0
router.post('/countries/:countryName', async(req, res)=>{ 
    //validate new country
    const {error} = newCountry_validation(req.params)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let country = await CountrySchema.findOne({ country: req.params.countryName.toLowerCase() });
    if (country){
        return res.status(400).send('Country already exists!');
    } 

    const newCountry = new CountrySchema({
        country:req.params.countryName.toLowerCase()
    })
    try{
        const savedCountry = await newCountry.save() 
        res.send(savedCountry)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/allCountry', async(req, res)=>{ // to check db
    const countries = await CountrySchema.find();
    res.json(countries)
})
router.delete('/allCountry', async(req,res)=>{ //to check db
    const deleted = await CountrySchema.deleteMany();
})


router.put('/countries/:countryName',(req, res)=>{
    res.send(`change permissions ${req.params.countryName}`)
})

module.exports = router