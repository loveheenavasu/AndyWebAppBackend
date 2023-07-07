const helperFunction = require("../helper/commonFunctions");
const {
  findOneSession,
  findOneAndUpdateSession,
  createSession,
} = require("../services/sessionServices");
const { findOneUser } = require("../services/userServices");
const MESSAGES = require("../utils/messages");
const {
  createCourse,
  findOneCourse,
  findCourse,
  findOneAndUpdateCourse,
} = require("../services/courseServices");
const courseModel = require("../models/courseModel");
const {
  createCourseEnrollment,
  findOneCourseEnrollment,
  findOneEnrolledCourse,
} = require("../services/courseEnrolledServices");
const { findOneAdmin, createAdmin } = require("../services/adminServices");

const userController = {};

/**
 * general function to get authentication of the user
 * @param {*} req
 * @param {*} res
 * @returns
 */
async function verifyUser(req, res) {
  if (!req.headers.authorization) {
    return res.json({ message: MESSAGES.UNAUTHORIZED_USER });
  }
  const session = await findOneSession({ token: req.headers.authorization });
  if (session) {
    const decryptToken = await helperFunction.decryptToken(
      req.headers.authorization
    );
    const user = await findOneUser({ _id: decryptToken._id });
    if (!user) {
      return res.json({ message: MESSAGES.UNAUTHORIZED_USER });
    } else {
      return user;
    }
  }
  return res.json({ message: MESSAGES.UNAUTHORIZED_USER });
}
/**
 * admin login
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.adminLogin = async (req, res) => {
  const payload = req.body;
  const admin = await findOneAdmin({ email: payload.email });
  if (!admin) {
    return res.json({ message: MESSAGES.INVALID_CREDENTIALS });
  }
  const token = await findOneSession({ userId: admin._id });
  res.json({ message: { token } });
};

userController.adminSignup = async (req, res) => {
  const adminExist = await findOneAdmin({ email: req.body.email });
  if (adminExist) {
    return res.json({ message: MESSAGES.EMAIL_EXIST });
  }
  const admin = await createAdmin(req.body);
  const token =await helperFunction.generateToken({ _id: admin._id });
  const session = {
    userId: admin._id,
    token: token,
    userType: "admin",
  };
  await createSession(session);
  return res.json({ message: { _id: admin._id, token: token } });
};

/**
 * link send to email for the user
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.onboarding = async (req, res) => {
  if (!req.body.email) {
    return res.json({ message: MESSAGES.EMAIL_NOT_ENTERED });
  }
  const user = await findOneUser({ email: req.body.email }, {});
  if (!user) {
    return res.json({ message: MESSAGES.EMAIL_NOT_EXIST });
  }
  const session = await findOneSession({ userId: user._id }, {});
  req.body.token = session.token;
  await helperFunction.sendEmail(req);
  return res.json({ message: MESSAGES.LINK_SENT_ON_EMAIL });
};

userController.verifyOnboarding = async (req, res) => {
  const user = await verifyUser(req, res);
  res.json({ message: user });
};

/**
 * show courses
 * @param {*} req
 * @param {*} res
 */
userController.getCourses = async (req, res) => {
  await verifyUser(req, res);
  const courses = await findCourse({}, { "course.description": 1 });
  console.log(courses);
  res.json(courses);
};

/**
 * for admin to create the course
 * @param {*} req
 * @param {*} res
 */
userController.createCourse = async (req, res) => {
  await helperFunction.adminAuthentication(req, res);
  const payload = req.body;
  await createCourse(payload);
  res.json({ message: MESSAGES.COURSE_ADDED });
};

/**
 * for user to give test
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.lessonTest = async (req, res) => {
  const user = await verifyUser(req, res);
  const courseEnrolled = await findOneEnrolledCourse({
    userId: user._id,
    courseId: req.body.courseId,
  });
  if (!courseEnrolled) {
    return res.json({ message: MESSAGES.COURSE_NOT_ENROLLED });
  }
  const answer = await findOneCourse({
    _id: req.body.courseId,
    "course.courseLesson": {
      $elemMatch: {
        "lesson.questionAnswer": {
          $elemMatch: { _id: req.body.id, correctAnswer: req.body.value },
        },
      },
    },
  });

  if (answer) {
    return res.json({ message: MESSAGES.CORRECT_ANSWER });
  } else {
    return res.json({ message: MESSAGES.INCORRECT_ANSWER });
  }
};

/**
 * show question to user during test
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.showQuestion = async (req, res) => {
  const user = await verifyUser(req, res);
  const courseEnrolled = await findOneEnrolledCourse({
    userId: user._id,
    courseId: req.body.courseId,
  });
  if (!courseEnrolled) {
    return res.json({ message: MESSAGES.COURSE_NOT_ENROLLED });
  }
  const question = await findOneCourse({
    _id: req.body.courseId,
    "course.courseLesson.lesson.lessonId": req.body.lessonId,
  });
  if (!question) {
    return res.json({ message: "work under progress" });
  }
  const courseLesson = question.course.courseLesson[0];
  const questionAnswer = courseLesson.lesson.questionAnswer;
  console.log(courseLesson);
  const questionAndOptions = questionAnswer.map(
    ({ question, options, _id }) => ({
      question,
      options,
      _id,
    })
  );
  res.json(questionAndOptions);
};

/**
 * show content to user for course
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.showContent = async (req, res) => {
  const user = await verifyUser(req, res);
  const courseEnrolled = await findOneEnrolledCourse({
    userId: user._id,
    courseId: req.body.courseId,
  });
  if (!courseEnrolled) {
    return res.json({ message: MESSAGES.COURSE_NOT_ENROLLED });
  }
  const lesson = await findOneCourse({
    _id: req.body.courseId,
    "course.courseLesson.lesson.lessonId": req.body.lessonId,
  });
  if (!lesson) {
    return res.json({ message: MESSAGES });
  }
  const courseLessons = lesson.course.courseLesson[0];
  console.log(courseLessons);
  const lessonDescription = courseLessons;
  res.json({ message: courseLessons.lesson.description });
};

/**
 * user purchase or start the course
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.courseEnroll = async (req, res) => {
  const user = await verifyUser(req, res);
  const course = await findOneCourse({ _id: req.body.courseId });
  console.log(course);
  if (!course) {
    return res.json({ message: MESSAGES.SOMETHING_WENT_WRONG });
  }
  const enrolledCourses = await findOneEnrolledCourse({
    userId: user._id,
    courseId: course._id,
  });
  if (enrolledCourses) {
    return res.json({ message: MESSAGES.COURSE_ALREADY_ADDED });
  }
  const enrollMent = {
    userId: user._id,
    courseId: course._id,
  };
  await createCourseEnrollment(enrollMent);
  res.json({ message: MESSAGES.COURSE_ENROLLED });
};

/**
 * admin can add new lesson to the course
 * @param {*} req
 * @param {*} res
 * @returns
 */
userController.addLesson = async (req, res) => {
  const admin = await helperFunction.adminAuthentication(req, res);
  const courseExist=await findOneCourse({_id:req.body.courseId});
  if(!courseExist){
    return res.json({message:MESSAGES.COURSE_DOES_NOT_EXIST});
  }
  const course = await findOneAndUpdateCourse(
    { _id: req.body.courseId },
    { $push: { "course.courseLesson": req.body.lesson } }
  );
  console.log(course);
  return res.json({ message: MESSAGES.LESSON_ADDED });
};

module.exports = userController;
