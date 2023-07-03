const mongoose = require("mongoose");


const RatingAndReviewSchema = new mongoose.Schema({
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    course: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true,
    },
    rating: {
        type:Number,
        required:true,
    },
    review: {
        type:String,
        trim:true,
        required:true,
    },

});


module.exports = mongoose.model("RatingAndReview", RatingAndReviewSchema);