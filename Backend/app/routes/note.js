const express = require('express');
const router = express.Router();

const controller = require('../controllers/note.rest');

router.get('/notes/:activityID/:subtaskID', controller.viewNotes);
router.post('/notes', controller.createNote);
router.put('/notes/:noteID', controller.updateNote);
router.delete('/notes/:noteID', controller.deleteNote);

module.exports = router;