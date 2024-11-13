const express = require('express');
const User = require('../model/user');
const router = express.Router();

router.post('./registerUser' , async(req,res)=>{
    const{userName, email , password , firstName , lastName  } = req.body;
    console.log('User deataisl', req.body);
    try {
          const newUser = new User({userName , email, password ,firstName, lastName })
          await newUser.save()
          return res.status(201).json({msg:"User Register Sucessfully"});

    } catch (error) {
        return res.status(400).json({msg:'Internam Server Error'});        
    }
});

router.post('./loginUser', async(req,res)=>{
    const {email , password} = req.body;
    console.log("User Login Deatail" ,req.body);
    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        return res.status(400).json({msg:'Internam Server Error'});   
    }
    
})