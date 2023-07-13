const nodeMailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const {SMTPMAIL, SMTPPASSWORD, SECRETKEY} = require('../../config');
const {findOneSession} = require('../services/sessionServices');
const MESSAGES = require('../utils/messages');
const {findOneUser} = require('../services/userServices');
const {findOneEnrolledCourse} = require('../services/courseEnrolledServices');
const helperFunction = {};

/**
 * send the email
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
    html: `<p>hello world <a href='http://localhost:3000?session=${req.body.token}'</a>please click on the given link</p>`,
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
 * generate the token
 * @param {*} payload
 */
helperFunction.generateToken = async (payload) => {
  return await jwt.sign(payload, SECRETKEY);
};

/**
 * decrypt the token
 * @param {*} token
 */
helperFunction.decryptToken = async (token) => {
  return await jwt.verify(token, SECRETKEY);
};

/**
 * to check the user is authenticated or not
 * @param {*} req
 * @param {*} res
 */
helperFunction.verifyUser = async (req, res) => {
  try {
    const session = await findOneSession({token: req.headers.authorization});
    if (!session) {
      return false;
    }
    req.body.userId = session.userId;
    return session.userId;
  } catch (error) {
    console.error('error at verifyUser', error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * to get the profile of user
 * @param {*} req
 */
helperFunction.getUser = async (req) => {
  const session = await findOneSession({token: req.headers.authorization});
  if (session) {
    const decryptToken = await helperFunction.decryptToken(
        req.headers.authorization,
    );
    const user = await findOneUser({_id: decryptToken._id});
    return user;
  }
  return null;
};

/**
 * to check whether the course is enrolled or not
 * @param {*} req
 * @param {*} res
 */
helperFunction.courseEnroll=async (req, res)=> {
  const courseEnrolled = await findOneEnrolledCourse({
    userId: req.body.userId,
    courseId: req.body.courseId,
  });
  if (!courseEnrolled) {
    return res.status(404).json({message: MESSAGES.COURSE_NOT_ENROLLED});
  }
};

/**
 * verifying the admin while adding the lesson
 * @param {*} req 
 * @param {*} res 
 */
helperFunction.adminAuthentication = async (req, res) => {
  const token = await findOneSession({
    token: req.headers.authorization,
    userType: 'admin',
  });
  if (!token) {
    return false;
  }
  return true;
};

module.exports = helperFunction;
