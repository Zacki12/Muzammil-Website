const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Certification = require('../models/Certification');
const Project = require('../models/Project');

// Public GET endpoints
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ publishedAt: -1, createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    console.error('Public fetch blogs error:', err);
    res.status(500).json({ error: 'Server error fetching blogs' });
  }
});

router.get('/certifications', async (req, res) => {
  try {
    const certs = await Certification.find({}).sort({ issueDate: -1 });
    res.json(certs);
  } catch (err) {
    console.error('Public fetch certifications error:', err);
    res.status(500).json({ error: 'Server error fetching certifications' });
  }
});

router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    console.error('Public fetch projects error:', err);
    res.status(500).json({ error: 'Server error fetching projects' });
  }
});

module.exports = router;
