//What Admins so
const router = require('express').Router();

router.put('/:countryName',(req, res)=>{
    res.send(`change data for ${req.params.countryName}`)
})


module.exports = router