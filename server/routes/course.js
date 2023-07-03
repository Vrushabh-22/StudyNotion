const express = require("express");
const router = express.Router();


const {auth, isInstructor, isAdmin, isStudent} = require("../middlewares/Auth");

// Course Routes
const {createCourse, getCourses, getCourseDetails, editCourse, getInstructorCourses, deleteCourse, getCourseFullDetails} = require("../controllers/Course");
router.post("/createCourse", auth, isInstructor, createCourse);
router.get("/getCourses", getCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getCourseFullDetails", auth,  getCourseFullDetails);
router.post("/editCourse", auth, isInstructor, editCourse)
router.get("/getInstructorCourses", auth, isInstructor,  getInstructorCourses)
router.delete("/deleteCourse", auth, isInstructor, deleteCourse )


//Section routes
const {createSection, updateSection, deleteSection} = require("../controllers/Section");
router.post("/createSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);

//SubSection routes
const {createSubSection, updateSubSection, deleteSubSection} = require("../controllers/SubSection");
router.post("/createSubSection", auth, isInstructor, createSubSection);
router.post("/updateSubSection", auth, isInstructor, updateSubSection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);


//Category Routes
const {createCategory, getCategories, categoryPageDetails} = require("../controllers/Category");
router.post("/createCategory", auth, isAdmin, createCategory);
router.get("/getCategories", getCategories);
router.post("/categoryPageDetails", categoryPageDetails);


//RatingAndReview Routes
const {createRatingAndReview, getAvgRating, getAllRatingReviews} = require("../controllers/RatingAndReview");
router.post("/createRatingAndReview", auth, isStudent, createRatingAndReview);
router.get("/getAvgRating", getAvgRating);
router.get("/getAllRatingReviews", getAllRatingReviews);

//course progress
const {updateCourseProgress} = require("../controllers/CourseProgress")
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress)

module.exports = router;