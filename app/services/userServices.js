const userModel = require('../models/userModel');

const userServices={};

/**
 * 
 * @param {*} payload 
 * @returns 
 */
userServices.createUser=async (payload)=>{
  return await userModel(payload).save();
};

userServices.findOneUser=async (searchQuery, projectionQuery)=>{
  return await userModel.findOne(searchQuery, projectionQuery);
};

module.exports=userServices;
