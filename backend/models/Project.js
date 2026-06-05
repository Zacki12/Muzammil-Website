const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  repoUrl: { type: String },
  liveUrl: { type: String },
  imageUrl: { type: String },
  tags: [{ type: String }],
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
