const express = require('express');
const router = express.Router();

const controller = require('../controllers/activities.rest');

router.get('/activities/:id', controller.viewActivity);
router.get('/activities', controller.viewActivities);

router.post('/activities', controller.createActivity);

router.put('/activities/:id', controller.updateActivity);

module.exports = router;