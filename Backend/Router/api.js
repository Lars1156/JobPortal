const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');

// User Api 
router.post('/registerUser' , userController.registerUser);
router.post('./loginUser' , userController.loginUser);
router.get('/getAllUser' , userController.getAllUsers)

module.exports = router;