
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
  updateCousre,
  updateCourse,
  updateLesson,
  updateQuestion,
  deleteQuestion,
  deleteLesson,
  deleteCourse,
} = require('../controller/onboardingController');
const onBoardingDataValidation =
require('../middleware/onBoardingDataValidation');
const {checkCourseOrLesson} = require('../middleware/onBoarding');
const { adminAuthentication } = require('../middleware/authentication');
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

onBoardingRoutes.post(
    '/course', 
    onBoardingDataValidation.addCourse, 
    adminAuthentication,
    addCourse);

onBoardingRoutes.post(
    '/courseEnrolled',
    onBoardingDataValidation.enrollCourse,
    checkCourseOrLesson,
    courseEnroll,
);

onBoardingRoutes.put(
    '/addLesson',
    onBoardingDataValidation.addLesson,
    adminAuthentication,
    checkCourseOrLesson,
    addLesson,
);

onBoardingRoutes.put(
    '/course',
    onBoardingDataValidation.updateCourse,
    adminAuthentication,
    checkCourseOrLesson,
    updateCourse
);

onBoardingRoutes.put(
    '/lesson',
    onBoardingDataValidation.updateLesson,
    adminAuthentication,
    checkCourseOrLesson,
    updateLesson
);

onBoardingRoutes.put(
    '/question',
    onBoardingDataValidation.updateQuestion,
    adminAuthentication,
    checkCourseOrLesson,
    updateQuestion
);

onBoardingRoutes.delete(
    '/question',
    onBoardingDataValidation.deleteQuestion,
    adminAuthentication,
    checkCourseOrLesson,
    deleteQuestion
);

onBoardingRoutes.delete(
    '/lesson',
    onBoardingDataValidation.deleteLesson,
    adminAuthentication,
    checkCourseOrLesson,
    deleteLesson
);

onBoardingRoutes.delete(
    '/course',
    onBoardingDataValidation.deleteCourse,
    adminAuthentication,
    checkCourseOrLesson,
    deleteCourse
    );

module.exports = onBoardingRoutes;
