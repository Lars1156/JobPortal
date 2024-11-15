const Job = require('../model/job');
const User = require('../model/user');

exports.createJob = async (req, res) => {
  try {
    const { title, company, location, salary, description } = req.body;
     console.log("Job details" , req.body);
     
    // Validate input
    if (!title || !company || !location || !salary || !description) {
      return res.status(400).json({ message: 'Please provide all job details' });
    }

    // Create a new job instance
    const job = new Job({
      title,
      company,
      location,
      salary,
      description,
      createdBy: req.user.id, 
    });

    await job.save();
    res.status(201).json({ message: 'Job created successfully', job });
  } catch (error) {
    console.error('Error creating job:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.getAllJobs = async (req, res) => {
  try {
    // Fetch all jobs from the Job collection
    const jobs = await Job.find();

    // Return the jobs in the response
    res.status(200).json({
      message: 'Jobs fetched successfully',
      jobs: jobs
    });
  } catch (error) {
    console.error(error);
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
// Update a job by its ID
exports.updateJob = async (req, res) => {
  const jobId = req.params.id; 
  const updatedData = req.body; 

  try {
    // Find the job by its ID and update it
    const job = await Job.findByIdAndUpdate(jobId, updatedData, { new: true });

    // Check if the job was found and updated
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Return the updated job data
    res.status(200).json({
      message: 'Job updated successfully',
      job: job
    });
  } catch (error) {
    console.error(error);
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
