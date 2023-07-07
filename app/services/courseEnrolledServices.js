const enrolledCourseModel = require("../models/enrolledCourseModel");

const courseEnrolledServices={};

/**
 * service for the enrolling for the course
 * @param {*} payload 
 * @returns 
 */
courseEnrolledServices.createCourseEnrollment=async(payload)=>{
    return await enrolledCourseModel(payload).save();
}

/**
 * 
 * @param {*} searchQuery 
 * @param {*} projectionQuery 
 * @returns 
 */
courseEnrolledServices.findOneEnrolledCourse=async(searchQuery,projectionQuery)=>{
    return await enrolledCourseModel.findOne(searchQuery,projectionQuery);
}

module.exports=courseEnrolledServices;