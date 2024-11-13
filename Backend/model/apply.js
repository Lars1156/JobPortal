const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }, // Reference to Job model
    candidateName: { type: String, required: true },
    candidateEmail: { type: String, required: true },
    resumeLink: { type: String, required: true }, // Link to the uploaded resume (could be a URL or file path)
    coverLetter: { type: String, required: false }, // Optional field
    appliedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Application = mongoose.model('Application', applicationSchema);

module.exports = Application;