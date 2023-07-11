const {lessonModel} = require('../models/courseModel');

const lessonServices={};
lessonServices.createLesson=async (lesson)=>{
  return await lessonModel(lesson).save();
};

lessonServices.findOneLesson=async (searchQuery, projectionQuery)=>{
  return await lessonModel.findOne(searchQuery, projectionQuery);
};

module.exports=lessonServices;
