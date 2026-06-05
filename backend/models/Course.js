const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnailUrl: { type: String },
  youtubeVideoId: { type: String, required: true }, // Private video integration
  isPublished: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Course', CourseSchema);