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

/**
 * service for deleting the enrolled course
 * @param {*} searchQuery 
 */
courseEnrolledServices.findOneAndDeleteEnrollCousrse = async (searchQuery) => {
  return await enrolledCourseModel.findOneAndDelete(searchQuery);
}

module.exports = courseEnrolledServices;
