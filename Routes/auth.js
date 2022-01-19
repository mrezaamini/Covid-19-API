//LOGIN module for authentication and loging and assigning tokens
const router = require('express').Router();
const UserSchema = require('../models/user')
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')


router.post('/login',async(req, res)=>{
  //TODO: validating login
  const user = await UserSchema.findOne({username : req.body.adminUsername})
  if(!user) return res.status(404).send('Username is not found')
  const valid_pass = await bcrypt.compare(req.body.adminPassword, user.password)
  if(!valid_pass) return res.status(400).send('Password is incorrect')

  //create and assign token 
  const token = JWT.sign({_id: user._id, adminUsername: user.adminUsername, role:user.role},
    '86a0f66f177fd7d8dd254e9f57f2057e70f9c3aa8c4719460eeb30056304910c2095819c0fdd796b4caef488c54b87b74e64592dd9c4973dafa368f27d33d8b5')
  res.header('user-token', token).send(token)
})


module.exports = router