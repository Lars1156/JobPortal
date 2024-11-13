const mongoose = require('mongoose');

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