const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const isAuth = require('../middleware/isAuth')
dotenv.config()


//route = POST auth/regiser
//Register a new user and send a token on succefull registration

router.post('/register',
 async (req,res) => {
  //destructure the details from the req.body
  let { email, password, passwordCheck, displayName } = req.body
  try {
    if (!email || !password || !passwordCheck || !displayName)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long." });

    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification." });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists." });

    const regex = /^[a-zA-Z\-]+$/
    let result = regex.test(displayName)
    if (result === false) {
       return res.status(400).json({msg: `Your display name is not valid. Only regular characters A-Z, a-z and '-' are  acceptable.`});
    };
   
    //if the email not exist create new user
    user = new User({
      displayName,
      email,
      password,
    });

    //generate salt for password encryption
    const salt = await bcrypt.genSalt(10);
    //encrypt the password before saving to the DB
    user.password = await bcrypt.hash(password, salt);
    //save the user
    await user.save();
    //creating the header for the token
    const payload = {
      user: {
        id: user.id
      }
    };
    //generating jwt token and send it to the user
    jwt.sign
    (
      payload, 
      process.env.JWT_SECRET/**secret variable */,
      {
        expiresIn: 9999
      }, 
      //check for error or send the token
      (err, token) => {
        if (err) throw err
        res.json({token})
      }
    );
      //catch error
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error')
  }
});

//route = POST auth/login
//Login the user and send a token

router.post('/login', 

 async (req,res) => {
  const {email, password} = req.body;
  try {
    //validation
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    //check if the email entered by the user exist
      let user = await User.findOne({email});
      if(!user) {
        return res.status(400).json({msg: 'No account with this email has been registered.'});
      };
      //check if the password the user entered matches with the encrypted password in the DB
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({msg: 'Invalid credentials.'});
      };
      //in case the password matches generate and send the jwt token to the user
      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload, 
        process.env.JWT_SECRET/**secret variable */,
        {
          expiresIn: 9999
        }, 
        //check for error or send the token
        (err, token) => {
          if (err) throw err
          res.json({token})
        });
    
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server error');
  }
});

//route = GET auth/user
//Check for token validation && return user

router.get('/user', isAuth, async (req,res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


module.exports = router