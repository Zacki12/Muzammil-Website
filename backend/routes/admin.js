const express = require('express');
const router = express.Router();
const adminAuth = require('../middleware/adminAuth');
const User = require('../models/User');
const Course = require('../models/Course');
const Blog = require('../models/Blog');
const Certification = require('../models/Certification');
const Project = require('../models/Project');

// Apply adminAuth middleware to ALL routes in this file
router.use(adminAuth);

// ==========================================
// COURSE MANAGEMENT
// ==========================================

// Get all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Fetch courses error:', error);
    res.status(500).json({ error: 'Server error fetching courses' });
  }
});

// Create a new course
router.post('/courses', async (req, res) => {
  try {
    const newCourse = new Course(req.body);
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    console.error('Create course error:', error);
    res.status(400).json({ error: 'Failed to create course' });
  }
});

// Update course pricing or content
router.put('/courses/:id', async (req, res) => {
  try {
    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedCourse);
  } catch (error) {
    console.error('Update course error:', error);
    res.status(400).json({ error: 'Failed to update course' });
  }
});

// Delete a course
router.delete('/courses/:id', async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted successfully' });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({ error: 'Failed to delete course' });
  }
});

// ==========================================
// USER MANAGEMENT
// ==========================================

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Server error fetching users' });
  }
});

// Delete a user
router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// ==========================================
// BLOG MANAGEMENT
// ==========================================

// Get all blogs
router.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    console.error('Fetch blogs error:', error);
    res.status(500).json({ error: 'Server error fetching blogs' });
  }
});

// Create new blog
router.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog(req.body);
    if (blog.isPublished && !blog.publishedAt) blog.publishedAt = new Date();
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    console.error('Create blog error:', error);
    res.status(400).json({ error: 'Failed to create blog' });
  }
});

// Update blog
router.put('/blogs/:id', async (req, res) => {
  try {
    const updated = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Update blog error:', error);
    res.status(400).json({ error: 'Failed to update blog' });
  }
});

// Delete blog
router.delete('/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error('Delete blog error:', error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// ==========================================
// CERTIFICATION MANAGEMENT
// ==========================================

// Get all certifications
router.get('/certifications', async (req, res) => {
  try {
    const certs = await Certification.find();
    res.json(certs);
  } catch (error) {
    console.error('Fetch certifications error:', error);
    res.status(500).json({ error: 'Server error fetching certifications' });
  }
});

// Create certification
router.post('/certifications', async (req, res) => {
  try {
    const cert = new Certification(req.body);
    await cert.save();
    res.status(201).json(cert);
  } catch (error) {
    console.error('Create certification error:', error);
    res.status(400).json({ error: 'Failed to create certification' });
  }
});

// Update certification
router.put('/certifications/:id', async (req, res) => {
  try {
    const updated = await Certification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Update certification error:', error);
    res.status(400).json({ error: 'Failed to update certification' });
  }
});

// Delete certification
router.delete('/certifications/:id', async (req, res) => {
  try {
    await Certification.findByIdAndDelete(req.params.id);
    res.json({ message: 'Certification deleted successfully' });
  } catch (error) {
    console.error('Delete certification error:', error);
    res.status(500).json({ error: 'Failed to delete certification' });
  }
});

// ==========================================
// PROJECT MANAGEMENT
// ==========================================

// Get all projects
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    res.status(500).json({ error: 'Server error fetching projects' });
  }
});

// Create project
router.post('/projects', async (req, res) => {
  try {
    const project = new Project(req.body);
    await project.save();
    res.status(201).json(project);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(400).json({ error: 'Failed to create project' });
  }
});

// Update project
router.put('/projects/:id', async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(400).json({ error: 'Failed to update project' });
  }
});

// Delete project
router.delete('/projects/:id', async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

module.exports = router;
