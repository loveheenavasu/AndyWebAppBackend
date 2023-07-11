const express = require('express');
const {
  onboarding,
  verifyOnboarding,
  getCourses,
  showQuestion,
  showContent,
  courseEnroll,
  addLesson,
  lessonTest,
  addCourse,
} = require('../controller/onboardingController');
const onBoardingDataValidation =
require('../middleware/onBoardingDataValidation');
const {checkCourse} = require('../middleware/onBoarding');
const onBoardingRoutes = express.Router();

onBoardingRoutes.get('/onboarding', onboarding);

onBoardingRoutes.get(
    '/verifyOnboarding',
    onBoardingDataValidation.verifyOnboarding,
    verifyOnboarding,
);

onBoardingRoutes.post('/course', onBoardingDataValidation.addCourse, addCourse);

onBoardingRoutes.post(
    '/courseEnrolled',
    onBoardingDataValidation.enrollCourse,
    courseEnroll,
);

onBoardingRoutes.get('/course', getCourses);

onBoardingRoutes.get('/test', onBoardingDataValidation.lessonTest, lessonTest);

onBoardingRoutes.get(
    '/questions',
    onBoardingDataValidation.showQuestion,
    checkCourse,
    showQuestion,
);

onBoardingRoutes.get(
    '/lessoncontent',
    onBoardingDataValidation.showContent,
    showContent,
);

onBoardingRoutes.put(
    '/addlesson',
    onBoardingDataValidation.addLesson,
    addLesson,
);

module.exports = onBoardingRoutes;
