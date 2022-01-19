//What Admins so
const router = require('express').Router();
const {ROLES} = require('../config/roles_list')
const authVerify = require('../middlewares/verifyToken')

router.put('/:countryName',authVerify,(req, res)=>{
    
    res.send(`change data for ${req.params.countryName}`)
})


module.exports = router