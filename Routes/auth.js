//LOGIN module for authentication and loging and assigning tokens
const router = require('express').Router();
const UserSchema = require('../models/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const {adminUserPass_validation} = require('../validation')
const {ROLES} = require('../config/roles_list')


router.post('/login',async(req, res)=>{ //loging user in and giving it a specific token based on user name and id
  const user = await UserSchema.findOne({username : req.body.adminUsername})
  if(!user) return res.status(404).send('Username is not found')
  const valid_pass = await bcrypt.compare(req.body.adminPassword, user.password)
  if(!valid_pass) return res.status(400).send('Password is incorrect')
  const token = JWT.sign({_id: user._id, adminUsername: user.adminUsername, role:user.role},
    '86a0f66f177fd7d8dd254e9f57f2057e70f9c3aa8c4719460eeb30056304910c2095819c0fdd796b4caef488c54b87b74e64592dd9c4973dafa368f27d33d8b5')
  res.header('user-token', token).send(token)
})


router.post('/register/superadmin', async(req,res)=>{ //registering a super admin
  const {error} = adminUserPass_validation(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    let admin = await UserSchema.findOne({ username: req.body.adminUsername });
    if (admin){
        return res.status(400).send('User already taken!');
    } 
    //Hashing Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.adminPassword,salt)
    console.log('--New Admin Add--')
    console.log('username:'+req.body.adminUsername)
    console.log('password:'+req.body.adminPassword+' >>hashed:'+hashPassword)
    const user = new UserSchema({
        username:req.body.adminUsername,
        password:hashPassword, //add hashed password to database for security
        role:ROLES.SUPERADMIN
    })
    try{
        const savedAdmin = await user.save() 
        res.status(201).send(savedAdmin) //successful added !
    }catch(err){
        res.status(400).send(err)
    }
})



module.exports = router