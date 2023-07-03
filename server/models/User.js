const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({ 
    firstName: {
        type:String,
        trim:true,
        required:true
    },
    lastName: {
        type:String,
        trim:true,
        required:true
    },
    email: {
        type:String,
        trim:true,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role: {
        type:String,
        enum:["Student", "Instructor", "Admin"],
        required:true
    },
    profileImage: {
        type:String,
        trim:true,
        required:true,
    },
    active: {
        type: Boolean,
        default: true,
    },
    approved: {
        type: Boolean,
        default: true,
    },
    profile: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],
    courseProgress: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }],
    token: {
        type:String
    },
    tokenExpires: {
        type:Date
    }
}, {timestamps:true});




module.exports = mongoose.model("User", userSchema);