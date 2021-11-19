const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');

// Create a User using: POST "/api/auth/". Doesn't require Auth
router.post('/',[
    body('email',"Invalid Email Address").isEmail(),
    body('password',"Password Lenght Should be Greater than 5").isLength({ min: 5 }),
    body('name',"Name lenght Should be atLeast 2 ").isLength({ min: 2 }),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }  
    User.create({
        name: req.body.name,
        email:req.body.email,
        password: req.body.password,
      }).then(user => res.json(user))
      .catch(err=>res.json({error : "PLease Enter a uniue Value for email",errMessage:err.message}))
})

module.exports = router 