const {findOneSession} = require('../services/sessionServices');
const MESSAGES = require('../utils/messages');

const authValidation = {};

/**
 * middleware function to validate the admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
authValidation.adminAuthentication = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({message: MESSAGES.UNAUTHORIZED_USER});
  }
  const token = await findOneSession({
    token: req.headers.authorization,
    userType: 'admin',
  });
  if (!token) {
    return res.status(401).json({message: MESSAGES.UNAUTHORIZED_USER});
  }
  next();
  return token;
};

module.exports = authValidation;
