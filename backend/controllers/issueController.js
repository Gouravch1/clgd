// clgd/backend/controllers/issueController.js
const Issue = require('../models/Issue');

// Get all issues
exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find(); // Fetch issues from the database
    res.json(issues);
  } catch (error) {
    console.error('Error fetching issues:', error);
    res.status(500).json({ message: 'Error fetching issues' });
  }
};

// Create a new issue
exports.createIssue = async (req, res) => {
  const newIssue = new Issue(req.body); // Create a new issue instance
  try {
    const savedIssue = await newIssue.save(); // Save to the database
    res.status(201).json(savedIssue); // Respond with the created issue
  } catch (error) {
    console.error('Error creating issue:', error);
    res.status(400).json({ message: 'Error creating issue' });
  }
};