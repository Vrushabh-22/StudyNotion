const mongoose = require("mongoose");



const courseSchema = new mongoose.Schema({
    courseName: {
        type:String,
        trim:true,
        required:true,
    },
    courseDescription: {
        type:String,
        trim:true,
        required:true,
    },
    price: {
        type:Number,
        trim:true,
        required:true,
    },
    thumbnail: {
        type:String,
        trim:true,
        required:true
    },
    whatYouWillLearn: {
        type:String,
        trim:true,
        required:true,
    },
    tags: {
        type:[String],
    },
    instructions: {
		type: [String],
	},
	status: {
		type: String,
		enum: ["Draft", "Published"],
	},
    category: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    },
    instructor: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    studentsEnrolled: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    courseContent: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
    }],
    ratingAndReviews: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"RatingAndReview"
    }],
    
}, {timestamps:true});


module.exports = mongoose.model("Course", courseSchema);