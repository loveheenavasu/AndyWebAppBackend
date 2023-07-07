const express = require("express");
const {
  onboarding,
  verifyOnboarding,
  getCourses,
  createCourse,
  test,
  showQuestion,
  showContent,
  courseEnroll,
  adminLogin,
  addLesson,
  adminSignup,
  lessonTest,
} = require("../controller/userController");
const onBoardingDataValidation = require("../middleware/onBoardingDataValidation");

const userRoutes = express.Router();

userRoutes.post('/admin',adminSignup);

userRoutes.get("/onboarding", onboarding);

userRoutes.post('/adminlogin',onBoardingDataValidation.adminLogin,adminLogin);

userRoutes.get("/verifyOnboarding", verifyOnboarding);

userRoutes.put('/addlesson',onBoardingDataValidation.addLesson,addLesson)

userRoutes.post("/course",createCourse)

userRoutes.get("/course", getCourses);

userRoutes.get("/test",lessonTest);

userRoutes.get('/questions',showQuestion);

userRoutes.get('/lessoncontent',showContent);

userRoutes.post('/courseEnrolled',courseEnroll);

module.exports = userRoutes;
