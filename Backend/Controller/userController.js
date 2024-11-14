const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const JWT_SECRET = "Kishan@1156";

async function registerUser(req,res){
    try {
        const {userName , email , password ,role} = req.body;
        console.log("User Deatails ", req.body);
        if(!userName|| !email|| !password || !role){
            return res.status(400).json({ msg: "Please enter all user details" });
        }
         const existingEmail = await User.findOne({email});
        const existingUserName = await User.findOne({userName});
        if (existingEmail) {
            return res.status(400).json({ msg: "User with this email already exists" });
        } else if (existingUserName) {
            return res.status(400).json({ msg: "User with this username already exists" });
        }
         // Create a new user object
         const user = {
            userName: userName,
            email: email,
            password: password,
            role : role
        };
        console.log('User details', user);
        const addData = new User(user);
        console.log("User data ", addData);

        await addData.save();
        res.status(200).json({ msg: "User added successfully" });
        
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ msg: "Server error, user not added" });
    }
};

async function loginUser(req,res) {
    try {
      const { email, password } = req.body;
      console.log("**User Deatails" , req.body);
      
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Check if the provided password matches the stored password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '10h' });
  
      res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, role: user.role }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
async function getAllUsers(req, res) {
    try {
        const users = await User.find(); // Retrieves all users from the database
        if (users.length === 0) {
            return res.status(404).json({ msg: "No users found" });
        }
        res.status(200).json({ msg: "Users retrieved successfully", data: users });
    } catch (error) {
        console.error('Error fetching users:', error);
        return res.status(500).json({ msg: "Server error, could not fetch users" });
    }
};
module.exports = {
    registerUser , 
    loginUser, 
    getAllUsers
}