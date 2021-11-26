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
    body('description', "Description cannot be blank").isLength({ min: 1 })
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

//Route3 : Update Notes: PUT "/api/notes/updatenote": Login Required!
router.put('/updatenote/:id', fetchUser, [
    body('title', "Title cannot be blank").isLength({ min: 1 }),
    body('description', "Description cannot be blank").isLength({ min: 1 }),
    body('tags', "Tags cannot be blank").isLength({ min: 1 })
    ], async (req, res) => {
    try {
        const { title, description, tags } = req.body;
        // Check for errors and if exist return Bad Request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //Finding a note & using provided note ID
        if (req.params.id.length !== 24) {
            return res.status(400).send("Not Found!")
        }
        const currentNote = await Notes.findById(req.params.id)
        if (!currentNote) {
            return res.status(404).send("Not Found!")
        } else {
            if (currentNote.user.toString() !== req.user.id) {
                return res.status(401).send("Not alllowed!")
            } else {
                const newNote = {}
                if (title) { newNote.title = title }
                if (description) { newNote.description = description }
                if (tags) { newNote.tags = tags }
                const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
                res.send(updatedNote)
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

//Route4 : Delete Notes: DELETE "/api/notes/deletenote": Login Required! 
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // Check for errors and if exist return Bad Request 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        //Finding a note & using provided note ID
        if (req.params.id.length !== 24) {
            return res.status(400).send("Not Found!")
        }
        const currentNote = await Notes.findById(req.params.id)
        if (!currentNote) {
            return res.status(404).send("Not Found!")
        } else {
            if (currentNote.user.toString() !== req.user.id) {
                return res.status(401).send("Not alllowed!")
            } else {
                await Notes.findByIdAndDelete(req.params.id)
                res.send({ "Success": "Deleted Note Succesfully", "id": `${req.params.id}` })
            }
        }
    } catch (error) {
        console.error(error)
        res.status(500).send("Some Internal Error Ocuured!")
    }
})

module.exports = router