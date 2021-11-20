const express = require('express');
const Notes = require('../models/Notes');
const router = express.Router()
const fetchUser = require('../middleware/fetchuser')

//Route1 : Fetch All Notes: GET "/api/notes/getallnotes".
router.get('/getallnotes', fetchUser, async (req, res) => {
  try {
    const allNotes = await Notes.find({ user: req.user.id })
    res.json(allNotes)
  } catch (error) {
    res.status(400).send("Some Error Occured while fetching Notes!")
  }

})
module.exports = router