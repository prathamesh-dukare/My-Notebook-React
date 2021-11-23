const express = require('express');
const Notes = require('../models/Notes');
const User = require('../models/User');
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


//Route1 : Fetch All Notes: GET "/api/notes/getallnotes" : Login Required!
router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        //Check whether the User Exists or Not with provided auth-token
        const isUser = await User.findById(req.user.id).select("-password")
        if (!isUser) {
            res.status(400).send("User not found with provided Token")
        } else {
            const allNotes = await Notes.find({ user: req.user.id })
            res.json(allNotes)
        }
    } catch (error) {
        res.status(400).send("Some Error Occured while fetching Notes!")
    }
})

//Route2 : Create Notes: POST "/api/notes/createnote": Login Required!
router.post('/createnote', fetchUser, [
    body('title', "Title cannot be blank").isLength({ min: 1 }),
    body('description', "Description cannot be blank").isLength({ min: 1 }),
    body('tags', "Tags cannot be blank").isLength({ min: 1 })
], async (req, res) => {
    try {
        // Check for errors and if exist return Bad Request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //Check whether the User Exists or Not with provided auth-token
        const isUser = await User.findById(req.user.id).select("-password")
        if (!isUser) {
            res.status(400).send("User not found with provided Token")
        } else {
            // Creating a Notes 
            const note = new Notes({
                user: req.user.id,
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags
            })
            const savedNote = await note.save()
            res.send(savedNote)
        }
    } catch (error) {
        // console.error(error.Message)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

module.exports = router