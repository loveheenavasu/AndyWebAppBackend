const sessionModel = require( '../models/sessionModel' );

const sessionServices = {};

/**
 * service to create the session
 * @param {*} session
 */
sessionServices.createSession = async ( session )=>{
  return await sessionModel( session ).save();
};

/**
 * service to search for the session
 * @param {*} searchQuery
 * @param {*} projectionQuery
 */
sessionServices.findOneSession = async ( searchQuery, projectionQuery )=>{
  return await sessionModel.findOne( searchQuery, projectionQuery );
};

/**
 * service to update the session
 * @param {*} searchQuery
 * @param {*} updateQuery
 */
sessionServices.findOneAndUpdateSession = async ( searchQuery, updateQuery )=>{
  return await sessionModel.findOneAndUpdate( searchQuery, updateQuery );
};

module.exports = sessionServices;
