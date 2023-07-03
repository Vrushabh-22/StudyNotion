const Section = require("../models/Section");
const Course = require("../models/Course");
const SubSection = require("../models/SubSection")

exports.createSection = async (req, res) => {
    try {
        const {courseId, sectionName} = req.body;

        if(!courseId || !sectionName){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        const response = await Section.create({sectionName});

        const updateCourse = await Course.findByIdAndUpdate(courseId, {$push: {courseContent: response._id}}, {new:true})
                                         .populate({
                                            path : "courseContent",
                                            populate : {
                                                path : "subSections"
                                            }
                                         })
                                         .populate("category")
                                         .exec();


        res.status(200).json({
            success:true,
            message:"Section created successfully",
            updateCourse
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to create a section"
        });
    }
}

exports.updateSection = async (req, res) => {
    try {
        const {sectionId, sectionName, courseId} = req.body

        if(!sectionId || !sectionName || !courseId){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }

        const updateSection = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});


        const updatedCourse = await Course.findById(courseId).populate({
            path : "courseContent",
            populate : {
                path: "subSections"
            }
        })
        .populate("category")
        .exec()


        res.status(200).json({
            success:true,
            message:"Section updated",
            updatedCourse
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to update a section"
        });
    }
}

exports.deleteSection = async (req, res) => {
    try {
        const {sectionId, courseId} = req.body;

        if(!sectionId || !courseId){
            return res.status(403).json({
                success:false,
                message:"All fields are mandetory"
            });
        }
        const section = await Section.findById(sectionId)

        await SubSection.deleteMany({_id: {$in: section.subSection}});

        await Section.findByIdAndDelete(sectionId);

        const updatedCourse = await Course.findById(courseId)
                                          .populate({
                                            path : "courseContent",
                                            populate : {
                                                path : "subSections"
                                            }
                                          })
                                          .populate("category")
                                          .exec()

        res.status(200).json({
            success:true,
            message:"Section deleted",
            updatedCourse
        });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({
            success:false,
            message:"Failed to delete a section"
        });
    }
}