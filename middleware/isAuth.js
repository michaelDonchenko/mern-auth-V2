const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');
dotenv.config()


module.exports = function(req,res,next) {
  //get the token 
  const token = req.header('x-auth-token')

  //check for token
  if (!token) {
    return res.status(401).json({msg: 'No token, authorization denied'})
  }
  //token verify && save the user in req.user
  //to access the user id = req.user.id
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded.user
    next()
  } catch (err) {
    res.status(401).json({msg: 'Token is not valid'})
  }
}