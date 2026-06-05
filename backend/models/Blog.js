const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  imageUrl: { type: String },
  isPublished: { type: Boolean, default: false },
  publishedAt: { type: Date }
}, { timestamps: true });

module.exports = mongoose.model('Blog', BlogSchema);
