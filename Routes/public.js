const router = require('express').Router();

router.get('/:countryName',(req, res)=>{
    res.send(`get country info for ${req.params.countryName}`)
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