const {PLEASE_ENTER_REQUIRED_FIELD} = require('../utils/messages');

const adminDataValidation = {};

/**
 * data validation for admin login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
adminDataValidation.adminLogin = (req, res, next) => {
  if (req.body.email && req.body.password) {
    next();
  } else {
    return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
  }
};

adminDataValidation.encryptToken = (req, res, next) => {
  if (req.body.userId) {
    next();
  } else {
    return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
  }
};

adminDataValidation.decryptToken = (req, res, next) => {
  if (req.body.token) {
    next();
  } else {
    return res.status(400).json({message: PLEASE_ENTER_REQUIRED_FIELD});
  }
};

module.exports = adminDataValidation;
