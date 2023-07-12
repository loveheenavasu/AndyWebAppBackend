const {findOneCourse} = require('../services/courseServices');
const {findOneLesson} = require('../services/lessonServices');
const {COURSE_DOES_NOT_EXIST} = require('../utils/messages');

/**
 * to check whether course exist or lesson exist or not
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkCourseOrLesson = async (req, res, next)=>{
  if (req.body.lessonId&&req.body.courseId) {
    const course= await findOneCourse({
      '_id': req.body.courseId,
      'courseLesson.lesson': req.body.lessonId});
    if (course) {
      const lesson= await findOneLesson({_id: req.body.lessonId});
      if (lesson) {
        req.body.course=course;
        req.body.lesson=lesson;
        next();
      }
    } else {
      return res.status(404).json({message: COURSE_DOES_NOT_EXIST});
    }
  } else {
    if (req.body.courseId) {
      const course= await findOneCourse({_id: req.body.courseId});
      if (course) {
        req.body.course=course;
        next();
      } else {
        return res.status(404).json({message: COURSE_DOES_NOT_EXIST});
      }
    }
  }
};
module.exports={checkCourseOrLesson};
