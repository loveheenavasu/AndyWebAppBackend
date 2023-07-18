const mongoose = require( 'mongoose' );
const { findOneCourse } = require( '../services/courseServices' );
const { findOneLesson } = require( '../services/lessonServices' );
const {
  COURSE_DOES_NOT_EXIST,
  LESSON_NOT_EXIST,
  INVALID_COURSE_OR_LESSON_ID,
  QUESTION_NOT_EXIST,
} = require( '../utils/messages' );

/**
 * to check whether course exist or lesson exist or not
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkCourseOrLessonOrQuestion = async ( req, res, next )=>{
  const { courseId, lessonId, questionId } = req.body;
  if ( mongoose.Types.ObjectId.isValid( courseId ) &&
  mongoose.Types.ObjectId.isValid( lessonId ) ) {
    const course = await findOneCourse( {
      '_id' : req.body.courseId,
      'courseLesson.lesson' : req.body.lessonId } );
    if ( !course ) {
      return res.status( 404 ).json( { message : COURSE_DOES_NOT_EXIST } );
    }
    const lesson = await findOneLesson( { _id : req.body.lessonId } );
    if ( !lesson ) {
      return res.status( 404 ).json( { message : LESSON_NOT_EXIST } );
    }
    req.body.course = course;
    req.body.lesson = lesson;
    next();
  } else if ( mongoose.Types.ObjectId.isValid( courseId ) ) {
    const course = await findOneCourse( { _id : courseId } );
    if ( !course ) {
      return res.status( 404 ).json( { message : COURSE_DOES_NOT_EXIST } );
    }
    req.body.course = course;
    next();
  } else if ( mongoose.Types.ObjectId.isValid( lessonId ) ) {
    const lesson = await findOneLesson( { _id : req.body.lessonId } );
    if ( !lesson ) {
      return res.status( 404 ).json( { message : LESSON_NOT_EXIST } );
    }
    req.body.lesson = lesson;
    next();
  } else if ( mongoose.Types.ObjectId.isValid( questionId ) ) {
    const question = await findOneLesson(
      { 'questionAnswer._id' : questionId },
    );
    if ( !question ) {
      return res.status( 404 ).json( { message : QUESTION_NOT_EXIST } );
    }
    next();
  } else {
    return res.status( 400 ).json( { message : INVALID_COURSE_OR_LESSON_ID } );
  }
};
module.exports = { checkCourseOrLessonOrQuestion };
