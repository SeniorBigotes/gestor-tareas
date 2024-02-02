const express = require('express');
const router = express.Router();

const controller = require('../controllers/group.rest');

router.get('/groups/:id/participants', controller.viewParticipants);
router.get('/groups/:id', controller.viewGroup);
router.get('/groups', controller.viewGroups);

module.exports = router;