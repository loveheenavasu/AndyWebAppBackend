const {findOneCourse} = require('../services/courseServices');
const {COURSE_DOES_NOT_EXIST} = require('../utils/messages');

const checkCourse=async (req, res, next)=>{
  const course=await findOneCourse({_id: req.body.courseId});
  if (course) {
    next();
  }
  return res.json({message: COURSE_DOES_NOT_EXIST});
};
module.exports={checkCourse};
