const express = require('express');
const router = express.Router();

const controller = require('../controllers/activitiesRest');

router.get('/activities', controller.viewActivities);

module.exports = router;