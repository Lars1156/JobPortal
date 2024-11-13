const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const jobController  = require('../Controller/jobController');
// const { authenticateUser } = require('../middleware/auth');
const authMiddleWare = require('../middleware/auth');
const applyController = require('../Controller/applyController');


// User Api 
router.post('/registerUser' , userController.registerUser);
router.post('/loginUser' , userController.loginUser);
router.get('/getAllUser' , userController.getAllUsers);
// Job Api
router.post('/createjobs', authMiddleWare,jobController.createJob );
router.get('/getAlljobs' , jobController.getAllJobs);
// router.get('/jobs/:jobId' , jobController.getJobById);
router.put('/updatejobs/:jobId',  jobController.updateJob);
// router.delete('/jobs/:jobId', authMiddleWare, jobController.deleteJob);
// router.post('/jobs/:jobId/apply', authMiddleWare, jobController.applyForJob);

// Application API
router.post('/applyJob', applyController.applyForJob);
router.get('/getAllJob', applyController.getAllJobs);
router.put('deleteJob' , applyController.deleteJob)
module.exports = router;