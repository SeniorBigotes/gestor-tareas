const express = require('express');
const router = express.Router();

const controller = require('../controllers/subtask.rest');

router.get('/subtasks/:id', controller.viewSubtasks);
router.put('/subtasks/:id', controller.changeStatus);

module.exports = router;