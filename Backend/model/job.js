const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      description: {
        type: String,
        required: true
      },
      requirements: {
        type: [String], // List of job requirements
        required: true
      },
      location: {
        type: String,
        required: true
      },
      salary: {
        type: Number, // Optional field for salary
        required: false
      },
      employmentType: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Temporary'],
        required: true
      },
      company: {
        name: {
          type: String,
          required: true
        },
        industry: {
          type: String,
          required: false
        },
        website: {
          type: String,
          required: false
        }
      },
      postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model (employer)
        required: true
      },
      applications: [
        {
          applicantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User' // Reference to the User model (job seeker)
          },
          resumeUrl: {
            type: String // URL to the applicant's resume
          },
          status: {
            type: String,
            enum: ['Pending', 'Reviewed', 'Interview Scheduled', 'Accepted', 'Rejected'],
            default: 'Pending'
          },
          appliedAt: {
            type: Date,
            default: Date.now
          }
        }
      ],
      postedAt: {
        type: Date,
        default: Date.now
      }
});

const Job = mongoose.model('Job' , jobSchema);
module.exports = Job