//What Public Users Can Do
const router = require('express').Router()
const CountrySchema = require('../models/country')
const {newCountry_validation} = require('../validation')

router.get('/:countryName',async(req, res)=>{
   // res.send(`get country info for ${req.params.countryName}`)
    const {error} = newCountry_validation(req.params)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let country = await CountrySchema.findOne({ country: req.params.countryName.toLowerCase() });
    if (!country){
        return res.status(404).send('Country Does Not Exist!');
    }
    res.status(200).send(country)
})
router.get('/',(req, res)=>{
    if(req.query.sort){
        res.send(`all sort by ${req.query.sort}`)
    }
    else{
        res.send('all country data')
    }
})

module.exports = router