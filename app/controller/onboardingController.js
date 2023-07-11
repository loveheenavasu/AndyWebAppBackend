const helperFunction = require('../helper/commonFunctions');
const {findOneSession} = require('../services/sessionServices');
const {findOneUser} = require('../services/userServices');
const MESSAGES = require('../utils/messages');
const {
  createCourse,
  findOneCourse,
  findCourse,
  findOneAndUpdateCourse,
} = require('../services/courseServices');
const {
  createCourseEnrollment,
  findOneEnrolledCourse,
} = require('../services/courseEnrolledServices');
const {createLesson, findOneLesson} = require('../services/lessonServices');

const userController = {};

// /**
//  * general function to get authentication of the user
//  * @param {*} req
//  * @param {*} res
//
//  */
// async function verifyUser(req, res) {
//   try {
//     if (!req.headers.authorization) {
//       return res.status(400).json({message: MESSAGES.UNAUTHORIZED_USER});
//    }
//     const session = await findOneSession({token: req.headers.authorization});
//     if (session) {
//       const decryptToken = await helperFunction.decryptToken(
//         req.headers.authorization
//       );
//       const user = await findOneUser({_id: decryptToken._id});
//       if (!user) {
//         return res.status().json({message: MESSAGES.UNAUTHORIZED_USER});
//      } else {
//         return user;
//      }
//    }
//     return res.status(400).json({message: MESSAGES.UNAUTHORIZED_USER});
//  } catch (error) {
//     console.error(error);
//     return res.status(500).json({message: 'Internal Server Error'});
//  }
// }

/**
 * link send to email for the user
 * @param {*} req
 * @param {*} res
 */
userController.onboarding = async (req, res) => {
  try {
    if (!req.body.email) {
      return res.status(400).json({message: MESSAGES.EMAIL_NOT_ENTERED});
    }
    const user = await findOneUser({email: req.body.email}, {});
    if (!user) {
      return res.status(404).json({message: MESSAGES.EMAIL_NOT_EXIST});
    }
    const session = await findOneSession({userId: user._id}, {});
    req.body.token = session.token;
    await helperFunction.sendEmail(req);
    return res.status(200).json({message: MESSAGES.LINK_SENT_ON_EMAIL});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

userController.verifyOnboarding = async (req, res) => {
  try {
    const user = await helperFunction.verifyUser(req, res);
    if (user) {
      res.status(200).json({message: user});
    } else {
      res.status(401).json({message: MESSAGES.UNAUTHORIZED_USER});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * show courses
 * @param {*} req
 * @param {*} res
 */
userController.getCourses = async (req, res) => {
  try {
    await helperFunction.verifyUser(req, res);
    const courses = await findCourse({}, {'description': 1});
    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * for admin to create the course
 * @param {*} req
 * @param {*} res
 */
userController.addCourse = async (req, res) => {
  try {
    await helperFunction.adminAuthentication(req, res);
    const payload = req.body;
    const lesson = {
      lessonName: payload.lessonName,
      description: payload.lessonDescription,
      questionAnswer: payload.questionAnswer,
      lessonId: payload.lessonId,
    };
    const lessonId = await createLesson(lesson);
    const course = {
      courseName: payload.courseName,
      description: payload.courseDescription,
      courseLesson: [{lesson: lessonId._id}],
    };
    await createCourse(course);
    res.status(201).json({message: MESSAGES.COURSE_ADDED});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * for user to give test
 * @param {*} req
 * @param {*} res
 */
userController.lessonTest = async (req, res) => {
  try {
    const user = await helperFunction.verifyUser(req, res);
    const courseEnrolled = await findOneEnrolledCourse({
      userId: user._id,
      courseId: req.body.courseId,
    });
    if (!courseEnrolled) {
      return res.status(404).json({message: MESSAGES.COURSE_NOT_ENROLLED});
    }
    const answer = await findOneCourse({
      '_id': req.body.courseId,
      'course.courseLesson.lesson.lessonId': req.body.lessonId,
      'course.courseLesson': {
        $elemMatch: {
          'lesson.questionAnswer': {
            $elemMatch: {
              _id: req.body.questionId,
              correctAnswer: req.body.value,
            },
          },
        },
      },
    });

    if (answer) {
      return res.status(200).json({message: MESSAGES.CORRECT_ANSWER});
    } else {
      return res.status(404).json({message: MESSAGES.INCORRECT_ANSWER});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * show question to user during test
 * @param {*} req
 * @param {*} res
 */
userController.showQuestion = async (req, res) => {
  try {
    const user = await helperFunction.verifyUser(req, res);
    const courseEnrolled = await findOneEnrolledCourse({
      userId: user._id,
      courseId: req.body.courseId,
    });
    if (!courseEnrolled) {
      return res.status(404).json({message: MESSAGES.COURSE_NOT_ENROLLED});
    }
    const question = await findOneLesson({
      '_id': req.body.lessonId,
    }, {'lessonName': 0, 'description': 0, 'questionAnswer.correctAnswer': 0});

    if (!question) {
      return res.status(404).json({message: MESSAGES.QUESTION_NOT_ADDED});
    }
    res.status(200).json(question);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * show content to user for course
 * @param {*} req
 * @param {*} res
 */
userController.showContent = async (req, res) => {
  try {
    const user = await helperFunction.verifyUser(req, res);
    const courseId = req.body.courseId;
    const lessonId = req.body.lessonId;
    const courseEnrolled = await findOneEnrolledCourse({
      userId: user._id,
      courseId: courseId,
    });
    if (!courseEnrolled) {
      return res.status(404).json({message: MESSAGES.COURSE_NOT_ENROLLED});
    }
    const course = await findOneCourse({
      '_id': courseId,
      'courseLesson.lesson': lessonId,
    });
    if (!course) {
      return res.status(404).json({message: MESSAGES.LESSON_NOT_FOUND});
    }
    const lessonContent = await findOneLesson(
        {_id: lessonId},
        {lessonName: 1, description: 1, _id: 0},
    );

    res.json({message: lessonContent});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};


// user can enroll the course
userController.courseEnroll = async (req, res) => {
  try {
    const user = await helperFunction.verifyUser(req, res);
    const course = await findOneCourse({_id: req.body.courseId});
    if (!course) {
      return res.status(404).json({message: MESSAGES.COURSE_DOES_NOT_EXIST});
    }
    const courseAlreadyEnrolled = await findOneEnrolledCourse({
      userId: user._id,
      courseId: course._id,
    });
    if (courseAlreadyEnrolled) {
      return res.status(409).json({message: MESSAGES.COURSE_ALREADY_ADDED});
    }
    const enrollMent = {
      userId: user._id,
      courseId: course._id,
    };
    await createCourseEnrollment(enrollMent);
    res.status(201).json({message: MESSAGES.COURSE_ENROLLED});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

/**
 * admin can add new lesson to the course
 * @param {*} req
 * @param {*} res
 */
userController.addLesson = async (req, res) => {
  try {
    await helperFunction.adminAuthentication(req, res);
    const courseExist = await findOneCourse({_id: req.body.courseId});
    if (!courseExist) {
      return res.status(404).json({message: MESSAGES.COURSE_DOES_NOT_EXIST});
    }
    const course = await findOneAndUpdateCourse(
        {_id: req.body.courseId},
        {$push: {'course.courseLesson': req.body.lesson}},
    );
    console.log(course);
    return res.status(201).json({message: MESSAGES.LESSON_ADDED});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: 'Internal Server Error'});
  }
};

module.exports = userController;
