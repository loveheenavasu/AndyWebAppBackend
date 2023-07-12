const userModel = require('../models/userModel');

const userServices = {};

/**
 * service to create the user
 * @param {*} payload
*/
userServices.createUser = async (payload)=>{
  return await userModel(payload).save();
};

/**
 * service to find one user
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
userServices.findOneUser = async (searchQuery, projectionQuery)=>{
  return await userModel.findOne(searchQuery, projectionQuery);
};

module.exports = userServices;
