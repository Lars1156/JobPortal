const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Job title is required']
      },
      description: {
        type: String,
        required: [true, 'Job description is required']
      },
      location: {
        type: String,
        required: [true, 'Job location is required']
      },
      salary: {
        type: Number,
        required: [true, 'Salary is required']
      },
      companyName: {
        type: String,
        required: [true, 'Company name is required']
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
});

const Job = mongoose.model('Job' , jobSchema);
module.exports = Job;