const {lessonModel} = require('../models/courseModel');

const lessonServices = {};

/**
 * service to create the lesson
 * @param {*} lesson
 */
lessonServices.createLesson = async (lesson)=>{
  return await lessonModel(lesson).save();
};

/**
 * service to search for the one lesson
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
lessonServices.findOneLesson = async (searchQuery, projectionQuery)=>{
  return await lessonModel.findOne(searchQuery, projectionQuery);
};

module.exports = lessonServices;
