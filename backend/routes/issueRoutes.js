// clgd/backend/routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const { getIssues, createIssue } = require('../controllers/issueController');

// Route to get all issues
router.get('/', getIssues);

// Route to create a new issue
router.post('/', createIssue);

module.exports = router;