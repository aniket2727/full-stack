


const express = require('express');
const router = express.Router();  // Corrected method
const { IssueDetailsController } = require('../controller/issueDetailsController');

router.post('/issueadd', IssueDetailsController);

module.exports = router;  // Correct export
