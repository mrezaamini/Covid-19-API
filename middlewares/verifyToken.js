const JWT =require('jsonwebtoken')

module.exports = function authVerify(req, res, next){
    const token = req.header('user-token')
    if(!token) return res.status(401).send('Login required!')
    try{
        const isVerified = JWT.verify(token,
            '86a0f66f177fd7d8dd254e9f57f2057e70f9c3aa8c4719460eeb30056304910c2095819c0fdd796b4caef488c54b87b74e64592dd9c4973dafa368f27d33d8b5')
        req.user = isVerified
        next()
    }catch(error){
        res.status(400).send('Token Expired!')
    }
    
}