const express = require('express');
const router = express.Router();

const controller = require('../controllers/subtask.rest');

router.get('/subtasks/:id', controller.viewSubtasks);
router.post('/subtasks', controller.createSubtask);
router.put('/subtasks/:id', controller.updateSubtask);
router.put('/subtasks/:id/status', controller.changeStatus);

module.exports = router;