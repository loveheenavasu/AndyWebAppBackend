const enrolledCourseModel = require('../models/enrolledCourseModel');

const courseEnrolledServices = {};

/**
 * service for the enrolling for the course
 * @param {*} payload
 * @return {*}
 */
courseEnrolledServices.createCourseEnrollment = async (payload)=>{
  return await enrolledCourseModel(payload).save();
};

/**
 * service for finding the enrolled course
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
courseEnrolledServices.findOneEnrolledCourse = async (
    searchQuery, projectionQuery)=>{
  return await enrolledCourseModel.findOne(searchQuery, projectionQuery);
};

module.exports = courseEnrolledServices;
