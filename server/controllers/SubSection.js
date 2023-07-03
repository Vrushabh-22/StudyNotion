require("dotenv").config()
const Uploader = require("../utils/Uploader");
const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course");



exports.createSubSection = async (req, res) => {
    try {
        const {title, description, sectionId, courseId} = req.body;

        const {video} = req.files

        if(!title || !description || !sectionId || !video){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        const uploadVideo = await Uploader(video, process.env.FOLDER_NAME);

        const response = await SubSection.create({
            title, timeDuration:uploadVideo.duration, description,videoUrl:uploadVideo.secure_url
        });

        const updateSection = await Section.findByIdAndUpdate(sectionId, {$push: {subSections: response._id}}, {new:true});


        const updatedCourse = await Course.findById(courseId).populate({
            path:"courseContent",
            populate:{
                path:"subSections"
            }
        })
        .populate("category")
        .exec();


        res.status(200).json({
            success:true,
            message:"SubSection created successfully",
            updatedCourse
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to create a subsection"
        });
    }
}

exports.updateSubSection = async (req, res) => {
    try {
        const {subSectionId, courseId} = req.body;
        const updates = req.body

        const subSection = await SubSection.findById(subSectionId);

        if(req.files){
            const {video} = req.files
            const uploadVideo = await Uploader(video, process.env.FOLDER_NAME);
            subSection.videoUrl = uploadVideo.secure_url;
            subSection.timeDuration = uploadVideo.duration
        }

        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                subSection[key] = updates[key]
            }
        }

        await subSection.save()

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
            message:"SubSection updated successfully",
            updatedCourse
        });

    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update a subsection"
        });
    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const {subSectionId, courseId} = req.body;


        if(!subSectionId){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        await SubSection.findByIdAndDelete(subSectionId);


        const updatedCourse = await Course.findById(courseId)
                                         .populate({
                                            path : "courseContent",
                                            populate : {
                                                path : "subSections"
                                            }
                                         })
                                         .populate("category")
                                         .exec();


        res.status(200).json({
            success:false,
            message:"Subsection deleted",
            updatedCourse
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to delete a subsection"
        });
    }
}