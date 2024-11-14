const express = require('express');
const router = express.Router();
const projectDetailsController = require('../controller/projectDetailsController');

// Define routes with specific controller methods
router.post('/projectdetails', projectDetailsController.projectDetailsController);
router.get('/getprojectdetails', projectDetailsController.getProjectDetails);

module.exports = router;
