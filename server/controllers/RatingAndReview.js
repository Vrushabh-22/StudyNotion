const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");


exports.createRatingAndReview = async (req, res) => {
    try {
        const userId = req.user.id;

        const {rating, review, courseId} = req.body;

        if(!rating || !review ||!courseId){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        const courseDetails = await Course.findOne({_id: courseId, studentsEnrolled: {$elemMatch: {$eq: userId}}} );

        if(!courseDetails){
            return res.status(403).json({
                success:false,
                message:"Student not enrolled in this course"
            });
        }

        const alreadyReviewed = await RatingAndReview.findOne({course: courseId, user: userId});

        if(alreadyReviewed){
            return res.status(403).json({
                success:false,
                message:"You already reviewed the course"
            });
        }

        const response = await RatingAndReview.create({
            user: userId, rating, review, course: courseId
        });

        const updateCourse = await Course.findByIdAndUpdate(courseId, {$push: {ratingAndReviews: response._id}}, {new:true});

        res.status(200).json({
            success:true,
            message:"Rating created successfully"
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to create rating and review"
        });
    }
}

exports.getAvgRating = async (req, res) => {
    try {
        const {courseId} = req.body;
        
        //here may be i have to cover courseID into mongoose.types.ObjectId
        const response = await RatingAndReview.aggregate([
            {$match : {course: courseId}},
            {$group: {_id:null, avgrating: {$avg: "$rating"}} }
        ]);

        if(response.length > 0){
            return res.status(200).json({
                success:true,
                message:"Avg rating found",
                avgRating:response[0].avgrating
            });
        }

        res.status(200).json({
            success:true,
            message:"Avg rating not found",
            avgRating:0,
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get avg rating and review"
        });
    }
}

exports.getAllRatingReviews = async (req, res) => {
    try {
        
        const response = await RatingAndReview.find({})
                                              .sort({rating:-1})
                                              .populate({
                                                path:"user",
                                                select:"firstName lastName email profileImage"
                                              })
                                              .populate({
                                                path:"course",
                                                select:"courseName"
                                              })
                                              .exec();

        res.status(200).json({
            success:true,
            message:"Fetched all rating reviews",
            ratingData : response
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get all rating and review"
        });
    }
}