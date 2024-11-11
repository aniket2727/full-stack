// projectDetailsRoutes.js
const express = require('express');
const router = express.Router();
const projectDetailsController = require('../controller/projectDetailsController');

router.post('/projectdetails', projectDetailsController);

module.exports = router;
