const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


//Route1 : Fetch All Notes: GET "/api/notes/getallnotes".
router.get('/getallnotes', fetchUser, async (req, res) => {
    try {
        const allNotes = await Notes.find({ user: req.user.id })
        res.json(allNotes)
    } catch (error) {
        res.status(400).send("Some Error Occured while fetching Notes!")
    }
})

//Route1 : Create Notes: POST "/api/notes/createnote". 
router.post('/createnote', fetchUser, [
    body('title', "Title cannot be blank").isLength({min:1}),
    body('description', "Description cannot be blank").isLength({min:1}),
    body('tags', "Tags cannot be blank").isLength({min:1})
], async (req, res) => {
    try {
        // Check for errors and if exist return Bad Request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Creating a Notes 
        const note = new Notes({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tags: req.body.tags
        })
        const savedNote = await note.save()
        res.send(savedNote)
    } catch (error) {
        // console.error(error.Message)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

module.exports = router