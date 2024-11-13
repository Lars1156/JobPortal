const User = require('../model/user');
const userServices = require('../Services/userServices');

async function registerUser(req,res){
    try {
        const {userName , email , password ,role ,profile } = req.body;
        console.log("User Deatails ", req.body);
        if(!userName|| !email|| !password || !role){
            return res.status(400).json({ msg: "Please enter all user details" });
        }
        if (!profile.fullName || !profile.phone) {
            return res.status(400).json({ message: 'Full name and phone are required.' });
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
            profile:profile
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

async function loginUser(req, res) {
    try {
        const {userName , password } = req.body;
        console.log("** User Login Datails " , req.body);
        const checkData = await User.findOne({email});
        if (checkData) {
            const validPassword = await bcrypt.compare(password, checkData.password);
            if (!validPassword) {
                return res.status(401).json({ msg: "Invalid password" });
            }
        } else {
            return res.status(401).json({ msg: "User does not exist" });
        }
        // Grenrate the WebTolken 
        const token = setUser(checkData);
        return res.status(200).json({ msg: "Successfully Logged In", data: checkData, token: token });
    } catch (error) {
        console.error('Error logging in user:', error);
        return res.status(500).json({ msg: "Server error, login failed" }); 
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
}

module.exports = {
    registerUser , 
    loginUser, 
    getAllUsers
}