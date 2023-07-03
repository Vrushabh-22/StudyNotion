require("dotenv").config();
const User = require("../models/User");
const Profile = require("../models/Profile");
const UploadToCloudinary = require("../utils/Uploader");
const Course = require("../models/Course");
const CourseProgress = require("../models/CourseProgress");


function convertSecondsToDuration(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = Math.floor((totalSeconds % 3600) % 60)
  
    if (hours > 0) {
      return `${hours}h ${minutes}m`
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`
    } else {
      return `${seconds}s`
    }
  }

//completed
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user.id;

        const {gender="", dateOfBirth="", about="", phoneNo=""} = req.body;

        const user = await User.findById(userId);

        const profileId = user.profile;

        const profile = await Profile.findByIdAndUpdate(profileId, {
            gender, dateOfBirth, about, phoneNo
        }, {new:true});

        res.status(200).json({
            success:true,
            message:"Profile updated successfully",
            profile
        });


    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update a profile"
        });
    }
}

exports.getUserDetails = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId)
                               .populate("profile")
                               .exec();

        user.password = undefined

        res.status(200).json({
            success:true,
            message:"Got user details",
            user
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get user details"
        });
    }
}

//completed
exports.changeProfileImage = async (req, res) => {
    try {
        const {profileImage} = req.files

        const userId = req.user.id;

        const uploadImage = await UploadToCloudinary(profileImage, process.env.FOLDER_NAME);

        const user = await User.findByIdAndUpdate(userId, {profileImage:uploadImage.secure_url}, {new:true}).populate("profile").exec();


        res.status(200).json({
            success:true,
            message:"Profile Image Changed Successfully",
            profileImg : user.profileImage
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update profile image"
        });
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;

        let user = await User.findById(userId).populate({
            path:"courses",
            populate:{
                path:"courseContent",
                populate:{
                    path:"subSections"
                }
            }
        }).exec();

        user = user.toObject();

        
        
        for (let i = 0; i < user.courses?.length; i++){

            let totalDurationInSeconds = 0
            let subSectionLength = 0

            for (let j = 0; j < user.courses[i].courseContent?.length; j++){

                totalDurationInSeconds += user.courses[i].courseContent[j].subSections.reduce((acc, curr) => parseInt (acc + curr.timeDuration), 0);

                user.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds);

                subSectionLength += user.courses[i].courseContent[j].subSections?.length
            }


            let courseProgress = await CourseProgress.findOne({
                courseID: user.courses[i]._id,
                userID: userId
            })

            

            
            courseProgress = courseProgress?.completedVideos?.length

            if(subSectionLength === 0){
                user.courses[i].progressPercentage = 100 
            }else{
                const multiplier = Math.pow(10, 2);

                user.courses[i].progressPercentage = Math.round(
                    (courseProgress / subSectionLength) * 100 * multiplier
                    ) / multiplier
            }
        }


        res.status(200).json({
            success:true,
            message:"Got all enrolled courses",
            courses : user.courses
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get all enrolled courses"
        });
    }
}

exports.deleteAccout = async (req, res) => {
    try {
        const userId = req.user.id;

        const user = await User.findById(userId);

        const profileId = user.profile;

         await Profile.findByIdAndDelete(profileId);

        await Course.updateMany(
            {studentsEnrolled: userId},
            {$pull: {studentsEnrolled: userId}},
            {new:true}
        )
        await User.findByIdAndDelete(userId);

        res.status(200).json({
            success:true,
            message:"User and Profile Deleted"
        })

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to delete user and profile"
        });
    }
}


exports.instructorDashboardData = async(req, res) => {
    try {
        const userId = req.user.id

        const courses = await Course.find({instructor: userId})

        const data = courses.map((course) => {
            const totalStudentsEnrolled = course.studentsEnrolled.length
            const totalAmount = totalStudentsEnrolled * course.price

            const courseAndStats = {
                _id: course._id,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                price: course.price,
                thumbnail: course.thumbnail,
                totalStudentsEnrolled,
                totalAmount
            }

            return courseAndStats
        })

        res.status(200).json({
            success:true,
            message:"fetched dashboard data",
            data
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"failed to fetch dashboard data",
        })
    }
}