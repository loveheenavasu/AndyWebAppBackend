const helperFunction = require( '../helper/commonFunctions' );
const { findOneSession } = require( '../services/sessionServices' );
const { findOneUser } = require( '../services/userServices' );
const MESSAGES = require( '../utils/messages' );
const {
  createCourse,
  findCourse,
  findOneAndUpdateCourse,
  findOneAndDeleteCourse,
} = require( '../services/courseServices' );
const {
  createCourseEnrollment,
  findOneEnrolledCourse,
  findOneAndDeleteEnrollCousrse,
} = require( '../services/courseEnrolledServices' );
const {
  createLesson,
  findOneLesson,
  findOneAndUpdateLesson,
  findAndDeleteOneLesson,
} = require( '../services/lessonServices' );

const userController = {};

/**
 * to send the email when tries to login
 * @param {*} req
 * @param {*} res
 */
userController.onboarding = async ( req, res ) => {
  try {
    if ( !req.body.email ) {
      return res.status( 400 ).json( { message : MESSAGES.EMAIL_NOT_ENTERED } );
    }
    const user = await findOneUser( { email : req.body.email }, {} );
    if ( !user ) {
      return res.status( 404 ).json( { message : MESSAGES.EMAIL_NOT_EXIST } );
    }
    const session = await findOneSession( { userId : user._id }, { } );
    req.body.token = session.token;
    await helperFunction.sendEmail( req );
    res.status( 200 ).json( { message : MESSAGES.LINK_SENT_ON_EMAIL } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * verify the user and getting his profile
 * @param {*} req
 * @param {*} res
  */
userController.verifyOnboarding = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( user ) {
      const userObj = await helperFunction.getUser( req );
      if ( userObj ) {
        return res.status( 200 ).json( { message : userObj } );
      }
    } else {
      res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
  } catch ( error ) {
    console.error( 'controller catch block  : : ', error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * user can see all the courses
 * @param {*} req
 * @param {*} res
 */
userController.getCourses = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( !user ) {
      return res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
    const courses = await findCourse( {}, { description : 1, courseName : 1 } );
    res.status( 200 ).json( courses );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can add new course
 * @param {*} req
 * @param {*} res
 */
userController.addCourse = async ( req, res ) => {
  try {
    const payload = req.body;
    const course = {
      courseName : payload.courseName,
      description : payload.courseDescription,
    };
    await createCourse( course );
    res.status( 201 ).json( { message : MESSAGES.COURSE_ADDED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * validating the answer is correct or wrong during test
 * @param {*} req
 * @param {*} res
 */
userController.lessonTest = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( !user ) {
      return res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
    const answer = await findOneLesson( {
      'questionAnswer._id' : req.body.questionId,
      'questionAnswer.correctAnswer' : req.body.value,
    } );
    if ( answer ) {
      res.status( 200 ).json( { message : MESSAGES.CORRECT_ANSWER } );
    } else {
      res.status( 404 ).json( { message : MESSAGES.INCORRECT_ANSWER } );
    }
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * user can see the question
 * @param {*} req
 * @param {*} res
 */
userController.showQuestion = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( !user ) {
      return res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
    const lesson = req.body.lesson.questionAnswer;
    res.status( 200 ).json( lesson );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * user can see the content of the lesson
 * @param {*} req
 * @param {*} res
 */
userController.showContent = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( !user ) {
      return res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
    res.json( { message : req.body.lesson } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * user can enroll the course
 * @param {*} req
 * @param {*} res
 */
userController.courseEnroll = async ( req, res ) => {
  try {
    const user = await helperFunction.verifyUser( req, res );
    if ( !user ) {
      return res.status( 401 ).json( { message : MESSAGES.UNAUTHORIZED_USER } );
    }
    const course = req.body.course;
    const courseAlreadyEnrolled = await findOneEnrolledCourse( {
      userId : user._id,
      courseId : course._id,
    } );
    if ( courseAlreadyEnrolled ) {
      return res.status( 409 ).json( {
        message : MESSAGES.COURSE_ALREADY_ADDED,
      } );
    }
    const courseEnroll = {
      userId : user._id,
      courseId : course._id,
    };
    await createCourseEnrollment( courseEnroll );
    res.status( 201 ).json( { message : MESSAGES.COURSE_ENROLLED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can add the new lesson
 * @param {*} req
 * @param {*} res
 */
userController.addLesson = async ( req, res ) => {
  try {
    for ( let i = 0; i < req.body.lesson.length; i++ ) {
      const lesson = await createLesson( req.body.lesson[i] );
      await findOneAndUpdateCourse(
        { _id : req.body.courseId },
        { $push : { courseLesson : { lesson : lesson._id } } },
      );
    }
    res.status( 201 ).json( { message : MESSAGES.LESSON_ADDED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};
/**
 * admin can update the course
 * @param {*} req
 * @param {*} res
 */
userController.updateCourse = async ( req, res ) => {
  try {
    await findOneAndUpdateCourse( { _id : req.body.courseId },
      { $set : req.body } );
    res.status( 200 ).json( {
      message : MESSAGES.COURSE_UPDATED_SUCCESSFULLY,
    } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can update the lesson
 * @param {*} req
 * @param {*} res
 */
userController.updateLesson = async ( req, res ) => {
  try {
    await findOneAndUpdateLesson( { _id : req.body.lessonId },
      { $set : req.body } );
    res.status( 200 ).json( { message : MESSAGES.LESSON_UPDATED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can update the question
 * @param {*} req
 * @param {*} res
 */
userController.updateQuestion = async ( req, res ) => {
  try {
    await findOneAndUpdateLesson( {
      'questionAnswer._id' : req.body.questionId,
    }, {
      $set : {
        'questionAnswer.$.question' : req.body.question,
        'questionAnswer.$.options' : req.body.options,
        'questionAnswer.$.correctAnswer' : req.body.correctAnswer,
      },
    } );
    res.status( 200 ).json( { message : MESSAGES.QUESTION_UPDATED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can delete the question
 * @param {*} req
 * @param {*} res
 */
userController.deleteQuestion = async ( req, res ) => {
  try {
    await findOneAndUpdateLesson( {
      'questionAnswer._id' : req.body.questionId,
    }, {
      $pull : { questionAnswer : { _id : req.body.questionId } },
    } );
    res.status( 200 ).json( { message : MESSAGES.QUESTION_DELETED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can delete the lesson
 * @param {*} req
 * @param {*} res
 */
userController.deleteLesson = async ( req, res ) => {
  try {
    await findAndDeleteOneLesson( { _id : req.body.lessonId } );
    await findOneAndUpdateCourse( { 'courseLesson.lesson' : req.body.lessonId },
      {
        $pull : { courseLesson : { lesson : req.body.lessonId } },
      },
    );
    res.status( 200 ).json( { message : MESSAGES.LESSON_DELETED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

/**
 * admin can delete the course
 * @param {*} req
 * @param {*} res
 */
userController.deleteCourse = async ( req, res ) => {
  try {
    const courseId = req.body.course._id;
    const lesson = req.body.course.courseLesson;
    await findOneAndDeleteEnrollCousrse( { courseId : courseId } );
    await findOneAndDeleteCourse( { _id : courseId } );
    for ( let i = 0; i < lesson.length; i++ ) {
      findAndDeleteOneLesson( { _id : lesson[i].lesson } );
    }
    res.status( 200 ).json( { message : MESSAGES.COURSE_DELETED } );
  } catch ( error ) {
    console.error( error );
    res.status( 500 ).json( { message : MESSAGES.INTERNAL_SERVER_ERROR } );
  }
};

module.exports = userController;
