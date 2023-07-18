/* eslint-disable valid-jsdoc */
const { default : mongoose } = require( 'mongoose' );
const { PLEASE_ENTER_REQUIRED_FIELD } = require( '../utils/messages' );

const adminDataValidation = {};

/**
 * data validation for admin login
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
adminDataValidation.adminLogin = ( req, res, next ) => {
  if ( req.body.email && req.body.password ) {
    next();
  } else {
    return res.status( 400 ).json( { message : PLEASE_ENTER_REQUIRED_FIELD } );
  }
};

/**
 * data validation for encrypting the token by admin
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
adminDataValidation.encryptToken = ( req, res, next ) => {
  if ( mongoose.Types.ObjectId.isValid( req.body.userId ) ) {
    next();
  } else {
    return res.status( 400 ).json( { message : PLEASE_ENTER_REQUIRED_FIELD } );
  }
};

/**
 * data validation to decrypt the token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
adminDataValidation.decryptToken = ( req, res, next ) => {
  if ( req.body.token ) {
    next();
  } else {
    return res.status( 400 ).json( { message : PLEASE_ENTER_REQUIRED_FIELD } );
  }
};

module.exports = adminDataValidation;
