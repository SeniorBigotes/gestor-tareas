const express = require('express');
const router = express.Router();

const controller = require('../controllers/subtask.rest');

router.get('/subtasks/:id', controller.viewSubtasks);

module.exports = router;