const express = require('express');
const route = express.Router();
const noteModel = require('../models/NotesModel.js');
//TODO - Create a new Note
//http://mongoosejs.com/docs/api.html#document_Document-save
route.post('/notes', async (req, res) => {

    // Validate request
    if (!req.body.noteTitle || !req.body.noteDescription || !req.body.priority) {
        return res.status(400).send({
            message: "Note content can not be empty"
        });
    }
    try {
        const newNotes = new noteModel(req.body);
        const savedNotes = await newNotes.save();
        res.status(201).json(savedNotes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);

//TODO - Retrieve all Notes
//http://mongoosejs.com/docs/api.html#find_find
route.get('/notes', async (req, res) => {

    try {
        const notes = noteModel;
        const allNotes = await notes.find();
        res.status(200).json(allNotes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//TODO - Retrieve a single Note with noteId
//http://mongoosejs.com/docs/api.html#findbyid_findById
route.get('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.params) {
        return res.status(400).send({
            message: "Note id cannot be empty"
        });
    }
    try {
        const notes = noteModel;
        const specificNote = await notes.findById(req.params.noteId)
        res.status(200).json(specificNote);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }

});

//TODO - Update a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandupdate_findByIdAndUpdate
route.put('/notes/:noteId', async (req, res) => {
    // Validate request
    if (!req.params) {
        return res.status(400).send({
            message: "Note ID cannot be empty"
        });
    }

    try {
        const Note = noteModel;
        const initialNote = await Note.findByIdAndUpdate(
            req.params.noteId,
            req.body,
            { new: true }
        );
        res.status(200).json(initialNote);

    } catch (err) {
        res.status(500).json({ message: err.message });
    }

});

//TODO - Delete a Note with noteId
//http://mongoosejs.com/docs/api.html#findbyidandremove_findByIdAndRemove
route.delete('/notes/:noteId', async (req, res) => {
    // Validate request - check if noteId is provided in params
    if (!req.params.noteId) {
        return res.status(400).send({
            message: "Note ID can not be empty"
        });
    }

    try {

        const deletedNote = await noteModel.findByIdAndDelete(req.params.noteId);

        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        }
        res.status(200).json({ message: "Note has been deleted successfully!", deletedNote });
    } catch (err) {
        return res.status(500).json({ message: "Couldn't delete the note. Please try again!", error: err.message });
    }
});


module.exports = route;