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
        await application.save();
        res.status(201).json({
            message: 'Application submitted successfully',
            application,
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
  // Update job details
exports.updateJob = async (req, res) => {
    const { jobId } = req.params; // Extract jobId from URL params
    const { title, description, companyName, location, salary, jobType, skillsRequired } = req.body;
  
    try {
      // Find the job by its jobId and update it
      const job = await Job.findByIdAndUpdate(
        jobId,
        {
          title,
          description,
          companyName,
          location,
          salary,
          jobType,
          skillsRequired,
        },
        { new: true } // Return the updated job
      );
  
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      res.status(200).json({ message: 'Job updated successfully', job });
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
    