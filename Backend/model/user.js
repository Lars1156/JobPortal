const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['job_seeker', 'employer',],
    default: 'employer'
  },
  profile: {
    fullName: {
      type: String,
      required: function() { return this.role === 'job_seeker'; }
    },
    phone: {
      type: String,
      required: function() { return this.role === 'job_seeker'; }
    },
    resume: {
      fileUrl: String, // URL to the stored resume file
      dateUploaded: Date
    },
    experience: {
      type: Number,
      min: 0
    },
    skills: [String]
  },
  company: {
    name: {
      type: String,
      required: function() { return this.role === 'employer'; }
    },
    location: String,
    industry: String,
    website: String
  },
  appliedJobs: [
    {
      jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job'
      },
      applicationStatus: {
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
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware to hash password before saving the user document
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to verify password
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
