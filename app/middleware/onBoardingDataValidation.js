const {
  PLEASE_ENTER_REQUIRED_FIELD,
  UNAUTHORIZED_USER,
} = require('../utils/messages');

const onBoardingDataValidation = {
  /**
   * data validation for adding the course
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return
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
   * @return
   */
  addLesson: (req, res, next) => {
    if (req.body.courseId && req.body.lesson) {
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
   * @return
   */
  verifyOnboarding: (req, res, next) => {
    if (req.headers.authorization) {
      next();
    } else {
      return res.status(401).json({message: UNAUTHORIZED_USER});
    }
  },

  /**
   * data validation for enrolling the course
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return
   */
  enrollCourse: (req, res, next) => {
    if (req.body.courseId) {
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
   * @return
   */
  showContent: (req, res, next) => {
    if (req.body.courseId && req.body.lessonId) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation to show the question
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return
   */
  showQuestion: (req, res, next) => {
    if (req.body.courseId && req.body.lessonId) {
      next();
    } else {
      return res.status(400).json({messge: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for the test of a lesson
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @return
   */
  lessonTest: (req, res, next) => {
    if (
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
