const express = require('express');
const router = express.Router();

const controller = require('../controllers/activitiesController');

router.get('/', controller.viewActivity);
router.post('/', controller.createActivity);
router.put('/:id', controller.updateActivity);

module.exports = router;