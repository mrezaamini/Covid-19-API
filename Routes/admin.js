//What Admins so
const router = require('express').Router();
const { ROLES } = require('../config/roles_list')
const authVerify = require('../middlewares/verifyToken')
const CountrySchema = require('../models/country')

router.put('/:countryName', authVerify, async (req, res) => {
    //we assuem that admins specify every data for specific country to update
    if (req.user.role !== ROLES.ADMIN) {
        console.log(req.user.role)
        return res.status(403).send("ACCESS DENIED!!")
    }

    try {
        const target_country = await CountrySchema.findOne({ country: req.params.countryName })
        if (!target_country) {
            return res.status(404).send('country not found!');
        }
        if (target_country.admins.includes(req.user._id)) {
            target_country.todayCases = req.body.todayCases
            target_country.todayDeaths = req.body.todayDeaths
            target_country.todayRecovered = req.body.todayRecovered
            target_country.critical = req.body.critical
            let date_ob = new Date();
            let date = ("0" + date_ob.getDate()).slice(-2);
            let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
            let year = date_ob.getFullYear();
            let hours = date_ob.getHours();
            let minutes = date_ob.getMinutes();
            target_country.last_changed = year + "-" + month + "-" + date + " " + hours + ":" + minutes
            await target_country.save() //saving new data into countrySchema
            res.status(201).send(target_country)

        }

    } catch(err) {
        res.status(500).send(err)
    }
})


module.exports = router