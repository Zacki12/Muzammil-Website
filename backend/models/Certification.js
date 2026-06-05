const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  issueDate: { type: Date },
  certUrl: { type: String },
  imageUrl: { type: String },
  isVerified: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Certification', CertificationSchema);
