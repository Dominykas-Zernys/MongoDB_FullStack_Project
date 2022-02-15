const express = require('express');

const router = express.Router();
const usersController = require('../controllers/usersController');

// Routes

router.get('/:order', usersController.getUsers);
router.post('/', usersController.postUsers);

module.exports = router;
