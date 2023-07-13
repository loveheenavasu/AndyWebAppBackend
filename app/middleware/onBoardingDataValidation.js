const mongoose = require('mongoose');
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
      req.headers.authorization&&
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
      mongoose.Types.ObjectId.isValid(payload.courseId)&&
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
    if (req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)) {
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
    if (req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId) && 
      mongoose.Types.ObjectId.isValid(req.body.lessonId)) {
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
    if (req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId) && 
      mongoose.Types.ObjectId.isValid(req.body.lessonId)) {
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
      mongoose.Types.ObjectId.isValid(req.body.lessonId) &&
      mongoose.Types.ObjectId.isValid(req.body.courseId) &&
      mongoose.Types.ObjectId.isValid(req.body.questionId) &&
      req.body.value
    ) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for updating the course
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  updateCourse: (req,res,next) => {
    if(
      req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)&&
      (req.body.courseName||req.body.description)) {
      next();
    } else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation for updating the course
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  updateLesson: (req,res,next) => {
    if(
      req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)&&
      mongoose.Types.ObjectId.isValid(req.body.lessonId)&& 
      (req.body.lessonName||req.body.description)){
        next();
      } 
      else {
        return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation to update the question
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  updateQuestion: (req,res,next) => {
    if(
      req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)&&
      mongoose.Types.ObjectId.isValid(req.body.lessonId)&&
      mongoose.Types.ObjectId.isValid(req.body.questionId)) {
        next();
      }
      else {
        return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
      }
  },

  /**
   * data validation to delete the question
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  deleteQuestion: (req,res,next) => {
    if(req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.lessonId)&&
      mongoose.Types.ObjectId.isValid(req.body.questionId)&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)){
        next();
      } 
      else {
        return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
      }
  },

  /**
   * data validation to delete the lesson
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  deleteLesson: (req,res,next) => {
    if(req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)&&
      mongoose.Types.ObjectId.isValid(req.body.lessonId)) {
        next();
    }
    else {
      return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
    }
  },

  /**
   * data validation to delete the course
   * @param {*} req 
   * @param {*} res 
   * @param {*} next
   */
  deleteCourse: (req,res,next) => {
    if(req.headers.authorization&&
      mongoose.Types.ObjectId.isValid(req.body.courseId)){
        next();
      }
      else {
        return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
      }
  }
};

module.exports = onBoardingDataValidation;
