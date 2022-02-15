const express = require('express');

const router = express.Router();
const servicesController = require('../controllers/servicesController.js');

// Routes

router.get('/', servicesController.getServices);
router.post('/', servicesController.postServices);
router.delete('/:id', servicesController.deleteServices);

module.exports = router;
