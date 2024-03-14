const express = require('express');
const router = express.Router();

const controller = require('../controllers/note.rest');

router.get('/notes/:activityID/:subtaskID', controller.viewNotes);
router.post('/notes', controller.createNote);

module.exports = router;