const express = require('express');
const router = express.Router();

const controller = require('../controllers/note.rest');

router.get('/notes/:activityID/:subtaskID', controller.viewNotes);

module.exports = router;