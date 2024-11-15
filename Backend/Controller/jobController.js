const Job  = require('../model/job');

exports.createJobBy = async(req,res)=>{
  try {
    const {title , description, location, salary, companyName } =req.body;
    console.log("**Job Deatils" , req.body);
    if (!title || !description || !location || !salary || !companyName) {
      return res.status(400).json({ message: 'Please provide all job details' });
    }
    if (req.user.id !== employer) {
      return res.status(403).json({ message: 'Unauthorized: Only employers can create jobs' });
    }
     const newJob = new Job({
       title,
       description,
       location, 
       salary, 
       companyName,
       createdBy: req.user._id
     });
     await newJob.save();
     res.status(201).json({ message: 'Job created successfully', newJob });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}