
const express = require( 'express' );
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
  updateCourse,
  updateLesson,
  updateQuestion,
  deleteQuestion,
  deleteLesson,
  deleteCourse,
} = require( '../controller/onboardingController' );
const onBoardingDataValidation =
require( '../middleware/onBoardingDataValidation' );
const { checkCourseOrLessonOrQuestion } = require( '../middleware/onBoarding' );
const { adminAuthentication } = require( '../middleware/authentication' );
// eslint-disable-next-line new-cap
const onBoardingRoutes = express.Router();

onBoardingRoutes.get( '/onboarding', onboarding );

onBoardingRoutes.get(
  '/verifyOnboarding',
  onBoardingDataValidation.verifyOnboarding,
  verifyOnboarding,
);

onBoardingRoutes.get( '/course', getCourses );

onBoardingRoutes.get( '/lessonTest',
  onBoardingDataValidation.lessonTest,
  checkCourseOrLessonOrQuestion,
  lessonTest );

onBoardingRoutes.get(
  '/showQuestions',
  onBoardingDataValidation.showQuestion,
  checkCourseOrLessonOrQuestion,
  showQuestion,
);

onBoardingRoutes.get(
  '/lessonContent',
  onBoardingDataValidation.showContent,
  checkCourseOrLessonOrQuestion,
  showContent,
);

onBoardingRoutes.post(
  '/course',
  adminAuthentication,
  onBoardingDataValidation.addCourse,
  addCourse );

onBoardingRoutes.post(
  '/courseEnrolled',
  onBoardingDataValidation.enrollCourse,
  checkCourseOrLessonOrQuestion,
  courseEnroll,
);

onBoardingRoutes.put(
  '/addLesson',
  adminAuthentication,
  onBoardingDataValidation.addLesson,
  checkCourseOrLessonOrQuestion,
  addLesson,
);

onBoardingRoutes.put(
  '/course',
  adminAuthentication,
  onBoardingDataValidation.updateCourse,
  checkCourseOrLessonOrQuestion,
  updateCourse,
);

onBoardingRoutes.put(
  '/lesson',
  onBoardingDataValidation.updateLesson,
  adminAuthentication,
  checkCourseOrLessonOrQuestion,
  updateLesson,
);

onBoardingRoutes.put(
  '/question',
  onBoardingDataValidation.updateQuestion,
  adminAuthentication,
  checkCourseOrLessonOrQuestion,
  updateQuestion,
);

onBoardingRoutes.delete(
  '/question',
  onBoardingDataValidation.deleteQuestion,
  adminAuthentication,
  checkCourseOrLessonOrQuestion,
  deleteQuestion,
);

onBoardingRoutes.delete(
  '/lesson',
  onBoardingDataValidation.deleteLesson,
  adminAuthentication,
  checkCourseOrLessonOrQuestion,
  deleteLesson,
);

onBoardingRoutes.delete(
  '/course',
  onBoardingDataValidation.deleteCourse,
  adminAuthentication,
  checkCourseOrLessonOrQuestion,
  deleteCourse,
);

module.exports = onBoardingRoutes;
