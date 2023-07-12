
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
const {checkCourseOrLesson} = require('../middleware/onBoarding');
// eslint-disable-next-line new-cap
const onBoardingRoutes = express.Router();

onBoardingRoutes.get('/onboarding', onboarding);

onBoardingRoutes.get(
    '/verifyOnboarding',
    onBoardingDataValidation.verifyOnboarding,
    verifyOnboarding,
);

onBoardingRoutes.get('/course', getCourses);

onBoardingRoutes.get('/lessonTest',
    onBoardingDataValidation.lessonTest,
    checkCourseOrLesson,
    lessonTest);

onBoardingRoutes.get(
    '/showQuestions',
    onBoardingDataValidation.showQuestion,
    checkCourseOrLesson,
    showQuestion,
);

onBoardingRoutes.get(
    '/lessonContent',
    onBoardingDataValidation.showContent,
    checkCourseOrLesson,
    showContent,
);

onBoardingRoutes.post('/course', onBoardingDataValidation.addCourse, addCourse);

onBoardingRoutes.post(
    '/courseEnrolled',
    onBoardingDataValidation.enrollCourse,
    checkCourseOrLesson,
    courseEnroll,
);

onBoardingRoutes.put(
    '/addLesson',
    onBoardingDataValidation.addLesson,
    checkCourseOrLesson,
    addLesson,
);

module.exports = onBoardingRoutes;
