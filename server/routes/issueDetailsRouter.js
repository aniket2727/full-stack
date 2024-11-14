


const express = require('express');
const router = express.Router();  // Corrected method
const { IssueDetailsController,getPaginatedIssues} = require('../controller/issueDetailsController');

router.post('/issueadd', IssueDetailsController);
router.get('/all_issue',getPaginatedIssues)
module.exports = router;  // Correct export
