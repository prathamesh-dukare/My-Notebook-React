const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchuser')

//Route1 : Create a User using: POST "/api/auth/createuser". Doesn't require Auth
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
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "The user with this email already exists" })
        } else {
            // hashing a password using bcrypt.js 
            const salt = bcrypt.genSaltSync(10)
            const secPass = bcrypt.hashSync(req.body.password, salt)
            // Creating a User 
            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPass
            })
            const authToken = jwt.sign({ user: {id:user.id} }, "mySectretString")
            res.json({ authToken })
        }
    } catch (error) {
        console.error(error.Message)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

//Route2 : Login a User Using: POST "/api/auth/login".
router.post('/login', [
    body('email', "Invalid Email Address").isEmail(),
    body('password', "Password cannot be blank").exists()
], async (req, res) => {
    try {
    const {email,password} = req.body
    let user = await User.findOne({email:email})
    if(!user){
        return res.status(400).json({error : "Invalid Credentials(email)"})
    }else{
        // Validating Password 
        const matchPassword = bcrypt.compareSync(password,user.password)
        if(matchPassword){
            const authToken = jwt.sign({ user: {id:user.id} }, "mySectretString")
            res.json({ authToken })
        }else{
            return res.status(400).json({error : "Invalid Credentials(Password)"})
        }
    }
    } catch (error) {
        console.error(error.Message)
        res.status(500).send("Some Internal Error Occured while Validating credentials!")
    }

})

//Route3 : Get LoggedIn user data: POST "/api/auth/getuser".
router.post('/getuser',fetchUser, async (req, res) => {
    try {
        const userID = req.user.id
        const userData = await User.findById(userID).select("-password")
        res.send(userData)
    } catch (error) {
        console.error(error.Message)
        res.status(500).send("Some Internal Error Ocuured!!")
    }
})















module.exports = router