const {
  PLEASE_ENTER_REQUIRED_FIELD,
} = require("../utils/messages");

const onBoardingDataValidation = {};

/**
 * to check proper data
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
onBoardingDataValidation.adminLogin = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    if (req.body.email && req.body.password) {
      next();
    } else {
      return res.json({ message: PLEASE_ENTER_REQUIRED_FIELD });
    }
  } else {
    return res.json({ message: PLEASE_ENTER_REQUIRED_FIELD });
  }
};

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
onBoardingDataValidation.addLesson = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    if (req.body.courseId && req.body.lesson) {
      next();
    } else {
      return res.json({ message: PLEASE_ENTER_REQUIRED_FIELD });
    }
  } else {
    return res.json({ message: PLEASE_ENTER_REQUIRED_FIELD });
  }
};

module.exports = onBoardingDataValidation;
