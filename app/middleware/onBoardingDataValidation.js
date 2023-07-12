const {
  PLEASE_ENTER_REQUIRED_FIELD,
} = require('../utils/messages');

const onBoardingDataValidation = {
  /**
   * data validation for adding the course
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addCourse: (req, res, next) => {
    const payload = req.body;
    if (
      payload.lessonName &&
      payload.lessonDescription &&
      payload.questionAnswer &&
      payload.courseName &&
      payload.courseDescription
    ) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for adding the lesson
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  addLesson: (req, res, next) => {
    const payload=req.body;
    if (
      req.headers.authorization&&
      payload.courseId&&
      payload.lessonName&&
      payload.description&&
      payload.questionAnswer.length>0
    ) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for verifying the user for onboarding
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  verifyOnboarding: (req, res, next) => {
    if (req.headers.authorization) {
      next();
    } else {
      return res.status(400).json({message: 'Authorization code not found!'});
    }
  },

  /**
   * data validation for enrolling the course
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  enrollCourse: (req, res, next) => {
    if (req.headers.authorization&&req.body.courseId) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for showing the content of lesson
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  showContent: (req, res, next) => {
    if (req.headers.authorization&&req.body.courseId && req.body.lessonId) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   *data validation for showing the questions
   * @param {*} req
   * @param {*} res
   * @param {*} next {*}
   */
  showQuestion: (req, res, next) => {
    if (req.headers.authorization&&req.body.courseId && req.body.lessonId) {
      next();
    } else {
      return res.status(400).json({messge: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for the test of a lesson
   * @param {*} req
   * @param {*} res
   * @param {*} nexts
   */
  lessonTest: (req, res, next) => {
    if (
      req.headers.authorization&&
      req.body.lessonId &&
      req.body.courseId &&
      req.body.questionId &&
      req.body.value
    ) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },
};

module.exports = onBoardingDataValidation;
