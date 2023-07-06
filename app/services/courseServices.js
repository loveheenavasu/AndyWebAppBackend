const courseModel = require("../models/courseModel");

const courseServices = {};

courseServices.createCourse = async (course) => {
  return await courseModel(course).save();
};

courseServices.findCourse = async (searchQuery, projectionQuery) => {
  return await courseModel.find(searchQuery, projectionQuery);
};

courseServices.findOneCourse=async(searchQuery,projectionQuery)=>{
    return await courseModel.findOne(searchQuery,projectionQuery);
}

courseServices.findOneAndUpdateCourse = async (searchQuery, updateQuery) => {
  return await courseModel.findOneAndUpdate(searchQuery, updateQuery);
};

module.exports = courseServices;
