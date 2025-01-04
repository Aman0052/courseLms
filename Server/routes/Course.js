// Import the required modules
const express = require("express")
const router = express.Router()

// Import the Controllers

// Course Controllers Import
const {createCourse,showAllCourses,getCourseDetails,publishCourse,getInstructorCourses,deleteCourse,getFullCourseDetails} = require("../controllers/Course")
//Update course progress route
const {updateCourseProgress} = require("../controllers/courseProgress");

// Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
  } = require("../controllers/Category")

// Sections Controllers Import
const {createSection,updateSection,deleteSection,} = require("../controllers/Section")

// Sub-Sections Controllers Import
const {createSubSection,updateSubSection,deleteSubSection,} = require("../controllers/subSection")

// Rating Controllers Import
const {createRating,getAverageRating,getAllRating,} = require("../controllers/RatingAndReview")

// Importing Middlewares
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth")
//Course routs

// Courses can Only be Created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
//Add a Section to a Course
router.post("/addSection", auth, isInstructor, createSection)
// Update a Section
router.post("/updateSection", auth, isInstructor, updateSection)
// Delete a Section
router.post("/deleteSection", auth, isInstructor, deleteSection)
// Edit Sub Section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
// Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection)
// Add a Sub Section to a Section
router.post("/addSubSection", auth, isInstructor, createSubSection)
//publish course
router.put("/publishCourse", auth, isInstructor, publishCourse)
//delete course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse)
//get all instructor cources
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses)
// Get all Registered Courses
router.get("/getAllCourses", showAllCourses)
//get full course details
router.post("/getFullCourseDetails", auth, getFullCourseDetails)
// Get Details for a Specific Courses
router.post("/getCourseDetails", getCourseDetails)
//update course progress
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// Category can Only be Created by Admin

router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)




//                                      Rating and Review

router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router;