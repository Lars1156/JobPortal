const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const jobController  = require('../Controller/jobController');
const authMiddleWare = require('../middleware/auth');

// User Api 
router.post('/registerUser' , userController.registerUser);
router.post('./loginUser' , userController.loginUser);
router.get('/getAllUser' , userController.getAllUsers)

// Job Api
router.post('/jobs' , authMiddleWare ,jobController.createJob );
router.get('/jobs' , jobController.getAllJobs);
router.get('/jobs/:jobId' , jobController.getJobById);
router.put('/jobs/:jobId', authMiddleWare, jobController.updateJob);
router.delete('/jobs/:jobId', authMiddleWare, jobController.deleteJob);
router.post('/jobs/:jobId/apply', authMiddleWare, jobController.applyForJob);

module.exports = router;