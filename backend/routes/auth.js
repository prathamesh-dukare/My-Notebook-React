const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

// Create a User using: POST "/api/auth/createuser". Doesn't require Auth
router.post('/createuser', [
    body('email', "Invalid Email Address").isEmail(),
    body('password', "Password Lenght Should be Greater than 5").isLength({ min: 5 }),
    body('name', "Name lenght Should be atLeast 2 ").isLength({ min: 2 }),
], async (req, res) => {
    try {
        // Check foe errors and if exist return Bad Request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Check whether the user with this email exists already
        const isEmailExist = await User.findOne({ email: req.body.email })
        if (isEmailExist) {
            return res.status(400).json({ error: "The user with this email already exists" })
        } else {
            // hashing a password using bcrypt.js 
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password,salt)
            // Creating a User 
            const user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password:secPass
            })
            const authToken = jwt.sign({user:user.id},"mySectretString")
            res.json({authToken})
        }
    } catch (error) {
        console.error(error.Message)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

module.exports = router