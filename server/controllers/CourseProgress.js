const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")

exports.updateCourseProgress = async (req, res) => {
    try {
        const {courseId, subSectionId} = req.body;
        const userId = req.user.id

        const subSection = await SubSection.findById(subSectionId)

        if(!subSection) {
            return res.status(200).json({
                success:false,
                message:"subSection does not exists"
            })
        }

        const courseProgress = await CourseProgress.findOne({
            courseID:courseId,
            userID:userId
        })

        if(!courseProgress){
            return res.status(200).json({
                success:false,
                message:"Course Progress Doesn't Exists"
            })
        }else{
            if(courseProgress.completedVideos.includes(subSectionId)){
                return res.status(200).json({
                    success:false,
                    message:"Already Completed"
                })
            }
            courseProgress.completedVideos.push(subSectionId)
        }

        await courseProgress.save();

        return res.status(200).json({
            success:true,
            message:"Course Progess Updated"
        })
    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message:"Failed to update course progress"
        })
    }
}