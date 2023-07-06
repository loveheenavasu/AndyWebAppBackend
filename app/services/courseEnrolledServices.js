const enrolledCourseModel = require("../models/enrolledCourseModel");

const courseEnrolledServices={};
courseEnrolledServices.createCourseEnrollment=async(payload)=>{
    return await enrolledCourseModel(payload).save();
}
courseEnrolledServices.findOneEnrolledCourse=async(searchQuery,projectionQuery)=>{
    return await enrolledCourseModel.findOne(searchQuery,projectionQuery);
}
module.exports=courseEnrolledServices;