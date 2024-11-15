const Job = require('../model/job')
exports.createJobBy = async (req, res) => {
  try {

    console.log(req.user)
    
    const { title, description, location, salary, companyName } = req.body;
    console.log("**Job Details", req.body);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'Unauthorized: User is not authenticated' });
    }
    if (!title || !description || !location || !salary || !companyName) {
      return res.status(400).json({ message: 'Please provide all job details' });
    }

    if (req.user.role !== 'employer') {
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
