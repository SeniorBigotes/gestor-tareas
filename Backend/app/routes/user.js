const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.rest');

router.get('/users/:id', controller.viewUser);
router.get('/users', controller.viewUsers);

module.exports = router;