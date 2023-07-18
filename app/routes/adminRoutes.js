const adminController = require( '../controller/adminController' );
const adminDataValidation = require( '../middleware/adminDataValidation' );
const express = require( 'express' );
const authValidation = require( '../middleware/authentication' );
// eslint-disable-next-line new-cap
const adminRoutes = express.Router();

adminRoutes.post( '/adminSignup', adminController.adminSignup );

adminRoutes.post(
  '/adminLogin',
  adminDataValidation.adminLogin,
  adminController.adminLogin,
);

adminRoutes.get(
  '/encryptToken',
  adminDataValidation.encryptToken,
  authValidation.adminAuthentication,
  adminController.encryptToken,
);

adminRoutes.get(
  '/decryptToken',
  adminDataValidation.decryptToken,
  authValidation.adminAuthentication,
  adminController.decrytToken,
);

module.exports = adminRoutes;
