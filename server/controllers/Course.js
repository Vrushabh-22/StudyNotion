require("dotenv").config();
const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress")
const Uploader = require("../utils/Uploader");
const mongoose = require("mongoose")


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


exports.createCourse = async (req, res) => {
    try {
        // fetch data
        const {
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            tags,
            category,
            instructions,
            status
        } = req.body;

        const {thumbnail} = req.files;

        //validation
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !tags || !category || !instructions){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        if (!status|| status === undefined) {
            status = "Draft"
          }

        const userId = req.user.id;

        const checkCategory = await Category.findById(category);


        if(!checkCategory){
            return res.status(403).json({
                success:false,
                message:"Invalid Category"
            });
        }

        const uploadThumb = await Uploader(thumbnail, process.env.FOLDER_NAME);

        const response = await Course.create({
            courseName,
            courseDescription,
            price,
            whatYouWillLearn,
            tags: JSON.parse(tags),
            category,
            instructions: JSON.parse(instructions),
            thumbnail:uploadThumb.secure_url,
            instructor:userId,
            status
        });

        

        const updateUser = await User.findByIdAndUpdate(userId, {$push: {courses: response._id}}, {new:true});

        const updateCategory = await Category.findByIdAndUpdate(category, {$push: {courses: response._id}}, {new:true});


        response.category = updateCategory;


        res.status(200).json({
            success:true,
            message:"Course Created Successfully",
            newCourse : response
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to create a course"
        });
    }
}

exports.editCourse = async (req, res) => {

    try {
        // fetch data
        const {courseId, category} = req.body
        const updates = req.body;


        
        const course = await Course.findById(courseId);

        const oldCategory = course.category._id

        if(category){
            if(!oldCategory.equals(category)){
                await Category.findByIdAndUpdate(oldCategory, {$pull: {courses : course._id} }, {new:true})
                await Category.findByIdAndUpdate(category, {$push: {courses : course._id} }, {new:true})
            }
        }
        


        if(req.files) {
            console.log("Entered")
            const thumbnail = req.files.thumbnail
            const uploadThumb = await Uploader(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = uploadThumb.secure_url
        }
        
        

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tags" || key === "instructions") {
                course[key] = JSON.parse(updates[key])
                } else {
                course[key] = updates[key]
                }
            }
        }

        await course.save();

        const updatedCourse = await Course.findById(courseId)
                                          .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"profile"
                                            }
                                          })
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSections"
                                            }
                                          })
                                          .populate("category")
                                          .populate("ratingAndReviews")
                                          .exec();


        res.status(200).json({
            success:true,
            message:"Course Updated Successfully",
            updatedCourse
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update a course"
        });
    }
}


exports.getCourses = async (req, res) => {
    try {
        const courses = await Course.find({});
        res.status(200).json({
            success:true,
            message:"Got all courses",
            courses
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get  all courses"
        });
    }
}

exports.getCourseDetails = async (req, res) => {
    try {
        const {courseId} = req.body;


        const courseDetails = await Course.findById(courseId)
                                          .populate("category")
                                          .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"profile"
                                            }
                                          })
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSections"
                                            }
                                          })
                                          .populate("ratingAndReviews")
                                          .exec();


        let totalDurationInSeconds = 0
        courseDetails?.courseContent.forEach((content) => {
            content?.subSections.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds)


        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Unable to fetch course details",
            });
        }                                  

        res.status(200).json({
            success:true,
            message:"Fetched course details",
            courseDetails,
            totalDuration,
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get details of course"
        });
    }
}

exports.getCourseFullDetails = async (req, res) => {
    try {
        const {courseId} = req.body;
        const userId = req.user.id;
        

        const courseDetails = await Course.findById(courseId)
                                          .populate("category")
                                          .populate({
                                            path:"instructor",
                                            populate:{
                                                path:"profile"
                                            }
                                          })
                                          .populate({
                                            path:"courseContent",
                                            populate:{
                                                path:"subSections"
                                            }
                                          })
                                          .populate("ratingAndReviews")
                                          .exec();


        let totalDurationInSeconds = 0
        courseDetails?.courseContent.forEach((content) => {
            content?.subSections.forEach((subSection) => {
            const timeDurationInSeconds = parseInt(subSection.timeDuration)
            totalDurationInSeconds += timeDurationInSeconds
            })
        })

        const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

        const courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userID:userId,
        })

        if(!courseDetails){
            return res.status(400).json({
                success:false,
                message:"Unable to fetch course details",
            });
        }                                  

        res.status(200).json({
            success:true,
            message:"Fetched course details",
            courseDetails,
            totalDuration,
            completedVideos : courseProgress?.completedVideos ?  courseProgress?.completedVideos : [],
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to get details of course"
        });
    }
}


exports.getInstructorCourses = async (req, res) => {
    try {
        const userId = req.user.id

        let  courses = await Course.find({instructor : userId}).sort({createdAt: -1}).populate({
            path:"courseContent",
            populate:{
                path:"subSections"
            }
        }).exec();


        courses =  courses.map((course) => {
            let totalDurationInSeconds = 0
            course?.courseContent.forEach((content) => {
                content?.subSections.forEach((subSection) => {
                const timeDurationInSeconds = parseInt(subSection.timeDuration)
                totalDurationInSeconds += timeDurationInSeconds
                })
            })
    
            const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
            
            return {...course._doc, totalDuration}
        })
 
        
           

        res.status(200).json({
            success:true,
            message:"Fetch all instructor coourses",
            courses
        })

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to fetch instructor courses"
        });
    }
}
//delete course

exports.deleteCourse = async (req, res) => {
    try {
        const {courseId} = req.body;
        
        const course = await Course.findById(courseId);

        const studentsEnrolled = course.studentsEnrolled;

        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId, {$pull : {courses : courseId}})
        }

        const sections = course.courseContent;

        for(const sectionId of sections){
            const section = await Section.findById(sectionId)
            if(section){
                const subSections = section.subSections;

                for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                }
            }
            await Section.findByIdAndDelete(sectionId)
        }

        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
            success:true,
            message:"Course Deleted Successfully"
        })

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to delete course"
        });
    }
}


//get course full details includes courseprogress timeduration