const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Notes = require("../models/Notes");
//Route for getting or fetching the existing user's notes
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});
// Route: 2 Add a new note using post "/api/auth/addnote"
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "description must be atleast 5 characters").isLength({
      min: 3,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);
// Route: 3 Update an existing note using post "/api/auth/updatenote"
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }
    // Find the note to be update
    let note = await Notes.findById(req.params.id);
    //To find wether the note is present or not
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //To check whether the user logged in have access to the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
// Route: 4 Delete an existing note using post "/api/auth/deletenote"
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    // Find the note to be deleted
    let note = await Notes.findById(req.params.id);
    //To find wether the note is present or not
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //To check whether the user logged in have access to the note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted Successfully",note});
  } 
  catch (error) {
    res.status(500).send("Internal server error");
  }
});
module.exports = router;
