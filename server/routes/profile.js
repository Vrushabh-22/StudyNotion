const express = require("express");
const router = express.Router();


const {updateProfile, getUserDetails, changeProfileImage, getEnrolledCourses, deleteAccout, instructorDashboardData} = require("../controllers/Profile");
const {auth, isStudent, isInstructor} = require("../middlewares/Auth");

//profie routs
router.put("/updateProfile", auth, updateProfile);
router.put("/changeProfileImage", auth, changeProfileImage);
router.delete("/deleteAccout", auth, deleteAccout);
router.get("/getUserDetails", auth, getUserDetails);
router.get("/getEnrolledCourses", auth, isStudent, getEnrolledCourses);
router.get("/instructorDashboardData", auth, isInstructor, instructorDashboardData)






module.exports = router; 