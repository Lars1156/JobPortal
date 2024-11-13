const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    userName: {
        type:String,
        required: true,
        trim :true
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String, 
        required:true,
        trim:true
    },
    firstName:{
        type :String,
        required: true,
        trim: true,
    },
    firstName:{
        type :String,
        required: true,
        trim: true,
    },
    lastName:{
        type :String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // Define user roles
        default: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});
// Pre-save middleware to hash password before saving
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        try {
            const saltRounds = 10;
            this.password = await bcrypt.hash(this.password, saltRounds);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User