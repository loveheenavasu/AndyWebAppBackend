const {lessonModel} = require('../models/courseModel');

const lessonServices = {};

/**
 * service to create the lesson
 * @param {*} lesson
 */
lessonServices.createLesson = async (lesson) => {
  return await lessonModel(lesson).save();
};

/**
 * service to search for the one lesson
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
lessonServices.findOneLesson = async (searchQuery, projectionQuery) => {
  return await lessonModel.findOne(searchQuery, projectionQuery);
};

/**
 * service to update the lesson
 * @param {*} searchQuery 
 * @param {*} updateQuery 
 */
lessonServices.findOneAndUpdateLesson = async (searchQuery, updateQuery) => {
  return await lessonModel.findOneAndUpdate(searchQuery, updateQuery);
}

/**
 * service to delete one question 
 * @param {*} searchQuery 
*/
lessonServices.findAndDeleteOneLesson = async (searchQuery) => {
  return await lessonModel.findOneAndDelete(searchQuery);
}

module.exports = lessonServices;
