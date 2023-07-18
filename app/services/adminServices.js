const adminModel = require( '../models/adminModel' );

const adminServices = {};

/**
 * service to add the admin
 * @param {*} payload
 */
adminServices.createAdmin = async ( payload )=>{
  return await adminModel( payload ).save();
};

/**
 * service to search for the admin
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
adminServices.findOneAdmin = async ( searchQuery, projectionQuery )=>{
  return await adminModel.findOne( searchQuery, projectionQuery );
};

module.exports = adminServices;
