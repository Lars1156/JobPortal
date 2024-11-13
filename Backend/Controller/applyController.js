const Application = require('../model/apply');
const Job  = require('../model/job');
const nodemailer = require('nodemailer');

exports.applyForJob = async(req,res)=>{
    try {
        const { jobId, candidateName, candidateEmail, resumeLink, coverLetter}= req.body;
        const job = await Job.findById(jobId);
        if (!job) {
          return res.status(404).json({ message: 'Job not found' });
        }
        const appliction = new Application({
            jobId,
            candidateName,
            candidateEmail,
            resumeLink,
            coverLetter,
        });
        await appliction.save();
        res.status(201).json({
            message: 'Application submitted successfully',
            appliction,
          });    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error: error.message });  
    }
};
// Get all jobs
exports.getAllJobs = async (req, res) => {
    try {
      const jobs = await Job.find(); // Fetch all jobs
      res.status(200).json(jobs); // Return the jobs as JSON
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
// Delete a job by jobId
exports.deleteJob = async (req, res) => {
    const { jobId } = req.params; // Extract jobId from URL params
  
    try {
      const job = await Job.findByIdAndDelete(jobId); // Find and delete the job
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
    