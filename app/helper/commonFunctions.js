const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {SMTPMAIL, SMTPPASSWORD, SECRETKEY} = require('../../config');
const {findOneSession} = require('../services/sessionServices');
const MESSAGES = require('../utils/messages');
const {findOneUser} = require('../services/userServices');
const helperFunction = {};

/**
 * to send the email
 * @param {*} req
 */
helperFunction.sendEmail = async (req) => {
  const transporter = await nodeMailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: SMTPMAIL,
      pass: SMTPPASSWORD,
    },
  });
  const options = {
    from: SMTPMAIL,
    to: req.body.email,
    subject: 'verfiy user',
    text: 'please click on the link to login' + req.body.token,
    html: `<p>hello world <a href='http://localhost:3000/session=${req.body.token}'</a>please click on the given link</p>`,
  };
  transporter.sendMail(options, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log(info);
    }
  });
};

/**
 * to generate the token
 * @param {*} payload
 */
helperFunction.generateToken = async (payload) => {
  return await jwt.sign(payload, SECRETKEY);
};

/**
 * to decrypt the token
 * @param {*} token
 */
helperFunction.decryptToken = async (token) => {
  return await jwt.verify(token, SECRETKEY);
};

/**
 * to check the user is admin or not
 * @param {*} req
 * @param {*} res
 * @returns
 */

helperFunction.adminAuthentication = async (req, res) => {
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
  return token;
};

/**
 * general function to get authentication of the user
 * @param {*} req
 * @param {*} res
 */
helperFunction.verifyUser = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({message: MESSAGES.UNAUTHORIZED_USER});
    }
    const session = await findOneSession({token: req.headers.authorization});
    if (session) {
      const decryptToken = await helperFunction.decryptToken(
          req.headers.authorization,
      );
      const user = await findOneUser({_id: decryptToken._id});
      if (!user) {
        return res.status(401).json({message: MESSAGES.UNAUTHORIZED_USER});
      } else {
        return user;
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = helperFunction;
