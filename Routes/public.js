//What Public Users Can Do
const router = require('express').Router()
const { query } = require('express');
const CountrySchema = require('../models/country')
const {newCountry_validation, sortQuery_validation} = require('../validation')


router.get('/:countryName',async(req, res)=>{
    const {error} = newCountry_validation(req.params)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let country = await CountrySchema.findOne({ country: req.params.countryName.toLowerCase() });
    if (!country){
        return res.status(404).send('Country Does Not Exist!'); // country not found
    }
    res.status(200).send(country) //country found 
})
router.get('/',async(req, res)=>{
    if(req.query.sort){ //check query for sort
       const {error} = sortQuery_validation(req.query) //validating sort query to be in valid cases
       if(error){
           return res.status(400).send(error.details[0].message)
       }
       const searchBase = ("{"+JSON.stringify(req.query.sort)+":"+(-1)+"}") //make e sort basis and set it to desc
       const tojson = JSON.parse(searchBase)
       try{
           const allCountries = await CountrySchema.find().sort(tojson) //get sorted countries
           res.status(200).json(allCountries)
       } catch(err){
           res.status(500).json(err) //server error
       }
    }
    else{
        try{
            const allCountries = await CountrySchema.find()
            res.status(200).json(allCountries)
        } catch (err){
            res.status(500).json(err) //server error
        }
    }
})

module.exports = router