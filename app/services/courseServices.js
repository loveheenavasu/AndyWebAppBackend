const {courseModel} = require('../models/courseModel');

const courseServices = {};

/**
 * service to create the course
 * @param {*} course
 */
courseServices.createCourse = async (course) => {
  return await courseModel(course).save();
};

/**
 * service to search for all the course
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
courseServices.findCourse = async (searchQuery, projectionQuery) => {
  return await courseModel.find(searchQuery, projectionQuery);
};


/**
 * service to search for the single course
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
courseServices.findOneCourse = async (searchQuery, projectionQuery)=>{
  return await courseModel.findOne(searchQuery, projectionQuery);
};

/**
 * service to search the course and update it
 * @param {*} searchQuery
 * @param {*} updateQuery
 */
courseServices.findOneAndUpdateCourse = async (searchQuery, updateQuery) => {
  return await courseModel.findOneAndUpdate(searchQuery, updateQuery);
};

/**
 * service to delete the course
 * @param {*} searchQuery
 */
courseServices.findOneAndDeleteCourse = async (searchQuery) => {
  return await courseModel.findOneAndDelete(searchQuery);
}

module.exports = courseServices;
