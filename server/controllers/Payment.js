require("dotenv").config();
const instance = require("../config/razerpay");
const crypto = require("crypto")
const Course = require("../models/Course");
const User = require("../models/User");
const Mailer = require("../utils/Mailer")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const CourseProgress = require("../models/CourseProgress");




exports.createOrder = async (req, res) => {
    try {
        const {courses} = req.body
        const userId = req.user.id

        let totalAmount = 0;

            for(const courseId of courses){
                let course;
                try {
                    course = await Course.findById(courseId)
                    if(course.studentsEnrolled.includes(userId)){
                        return res.status(200).json({
                            success:false,
                            message:"Student Already Enrolled"
                        })
                    }

                    totalAmount += course.price
                } catch (error) {
                    console.log(error)
                    return res.status(400).json({
                        success:false,
                        message:"Failed to calculate amount"
                    })
                }
                
            }

        const order = await instance.orders.create({
            amount : totalAmount * 100,
            currency : "INR",
            receipt : crypto.randomUUID()
        })

        res.status(200).json({
            success:true,
            message:"Order Placed",
            order
        })

    } catch (error) {
        console.log(error)
        res.status(404).json({
            success:false,
            message: "Order Failed "
        })
    }
}



exports.verifySignature = async (req, res) => {
    try {

        const {razorpay_order_id, razorpay_payment_id, razorpay_signature} = req.body
        const {courses} = req.body
        const userId = req.user.id

        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex");


        if(expectedSignature === razorpay_signature){
            for(const courseId of courses){
                const course = await Course.findByIdAndUpdate(courseId, {$push : {studentsEnrolled: userId}}, {new:true})

                const courseProgress = await CourseProgress.create({
                    courseID:courseId,
                    userID:userId,
                    completedVideos:[],
                })
                const updateStudent = await User.findByIdAndUpdate(userId, {$push: {courses : course._id, courseProgress: courseProgress}}, {new:true})
                await Mailer(updateStudent.email, courseEnrollmentEmail(course.courseName, `${updateStudent.firstName} ${updateStudent.lastName}`), `Successfully Enrolled into ${course.courseName}`)
            }
        }


        res.status(200).json({
            success:true,
            message:"Payment Successful"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            success:false,
            message:"Payment Failed"
        })
    }
}