const Job = require('../model/job');
const User = require('../model/user');

exports.createJob =  async (req,res) =>{
    console.log("Autherise User : ", req.body);
    
  try {
       const { title, description, requirements, location, salary, employmentType, company } = req.body;
       console.log("**Job deatails" , req.body );
       
       if(req.user.role !== 'eamployer'){
         return res.status(403).json({msg:"Only employer can created the Job Portal"});
       }
       const newJob = new Job({
        title,
        description,
        requirements,
        location,
        salary,
        employmentType,
        company,
        postedBy: req.user.userId  // Assumes req.user contains the authenticated user's ID
    });
        await newJob.save();
       console.log("**New Job", newJob);
       
       return res.status(200).json({ message: 'Job created successfully', job: newJob });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.getAllJobs  = async(req,res) =>{
    try {
        const jobs = await Job.find().populate('postedBy', 'username email');
        res.status(200).json(jobs);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
      }
};

exports.getJobById = async(req,res)=>{
    try {
        const { jobId } = req.params;
        const job = await Job.findById(jobId).populate('postedBy', 'userName email');
        if (!job) {
            return req.status(404).json({msg:"Job not Found"});
        }
        res.status(200).json(job);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }

};

// Upadte the Jobs On the Poratal
exports.updateJob = async(req,res)=>{
    try {
        const { jobId } = req.params;
        const updates = req.body;
         // Find the job and check if the current user is the owner
          const job = await Job.findById(jobId);
          if(!job){
            return res.status(404).json({ message: 'Job not found' });
          }
          if (job.postedBy.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'You are not authorized to update this job' });
          }
          Object.assign(job, updates);
          await job.save();
          return res.status(201).json({msg:"Job will be Upadate Successsfully On the Portal"});      
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.deleteJob = async(req,res)=>{
    try {
        const { jobId } = req.params;
        const job = await Job.findById({jobId});
        if(!job){
            return res.status(404).json({ message: 'Job not found' });
        }
        
         if (job.postedBy.toString() !== req.user.userId) {
           return res.status(403).json({ message: 'You are not authorized to delete this job' });
        }
        await job.remove();
        res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Applying the Job On the Poratal 
exports.applyForJob = async(req,res)=>{
  try {
    const { jobId } = req.params;
    const { resumeUrl } = req.body;
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({ message: 'Job not found' });
    }
     if (job.applications.some(app => app.applicantId.toString() === req.user.userId)) {
        return res.status(400).json({ message: 'You have already applied for this job' });
      }
      job.applications.push({
        applicantId: req.user.userId,
        resumeUrl,
        appliedAt: new Date()
      });
  
      await job.save();
  
      res.status(200).json({ message: 'Job application submitted successfully' });
  } catch (error) {
    
  }
};