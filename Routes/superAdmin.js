//What SuperAdmins Do
const router = require('express').Router()
const UserSchema = require('../models/user')
const CountrySchema = require('../models/country')
const bcrypt = require('bcryptjs')
const { adminUserPass_validation, newCountry_validation } = require('../validation')
const { ROLES } = require('../config/roles_list')
const authVerify = require('../middlewares/verifyToken')


//Make new admin with username and password
router.post('/admin', authVerify, async (req, res) => {
    if (req.user.role !== ROLES.SUPERADMIN) {
        return res.status(403).send("ACCESS DENIED!!")
    }
    //validate new admin username and password
    const { error } = adminUserPass_validation(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let admin = await UserSchema.findOne({ username: req.body.adminUsername });
    if (admin) {
        return res.status(400).send('User already taken!');
    }
    //Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.adminPassword, salt)
    console.log('--New Admin Add--')
    console.log('username:' + req.body.adminUsername)
    console.log('password:' + req.body.adminPassword + ' >>hashed:' + hashPassword)
    const user = new UserSchema({
        username: req.body.adminUsername,
        password: hashPassword, //add hashed password to database for security
        role: ROLES.ADMIN
    })
    try {
        const savedAdmin = await user.save()
        res.status(201).send(savedAdmin) //successful added !
    } catch (err) {
        res.status(400).send(err)
    }
})

// Make new country with initial value of all cases equal to 0
router.post('/countries/:countryName', authVerify, async (req, res) => {
    if (req.user.role !== ROLES.SUPERADMIN) {
        return res.status(403).send("ACCESS DENIED!!")
    }
    //validate new country
    const { error } = newCountry_validation(req.params)
    if (error) {
        return res.status(400).send(error.details[0].message)
    }
    let country = await CountrySchema.findOne({ country: req.params.countryName.toLowerCase() });
    if (country) {
        return res.status(400).send('Country already exists!');
    }
    
    let date_ob = new Date();
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    const newCountry = new CountrySchema({ //making new country
        country: req.params.countryName.toLowerCase(),
        last_changed:year + "-" + month + "-" + date + " " + hours + ":" + minutes
    })
    try {
        const savedCountry = await newCountry.save()
        res.status(201).send(savedCountry) //successful added !
    } catch (err) {
        res.status(400).send(err)
    }
})


router.put('/countries/country', authVerify, async (req, res) => { //adding admins to specific country
    if (req.user.role !== ROLES.SUPERADMIN) {
        return res.status(403).send("ACCESS DENIED!!")
    }
    try {
        const target_country = await CountrySchema.findOne({ country: req.body.countryName });
        if (!target_country) {
            return res.status(404).send('country not found!');
        }
        
        if (req.body.add) { //add admins to admins
            req.body.adminIDs.forEach((target_admin) => {
                if (!target_country.admins.includes(target_admin)) {
                    target_country.admins.push(target_admin)
                }
            })
        } else  { // remove admins from country
            target_country.admins = target_country.admins.filter((target_admin) => {
                !adminIDs.includes(target_admin)
            })
        }
        await target_country.save(); //saving country
        res.status(201).send(target_country)

    } catch (err) {
        res.status(500).send(err) //server data base error
    }
})

//extra db operations for deleting or viewing all admins and countries -- for debugging data base
router.get('/allCountry', async (req, res) => { // to check db
    const countries = await CountrySchema.find();
    res.json(countries)
})
router.delete('/allCountry', async (req, res) => { //to check db
    const deleted = await CountrySchema.deleteMany();
})
router.delete('/admin', async (req, res) => { //to check db
    const deleted = await UserSchema.deleteMany();
})

router.get('/admin', async (req, res) => { // to check db
    const admins = await UserSchema.find();
    res.json(admins)
})

module.exports = router