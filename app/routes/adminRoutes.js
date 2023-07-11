const adminController = require('../controller/adminController');
const adminDataValidation = require('../middleware/adminDataValidation');
const express = require('express');
const authValidation = require('../middleware/authentication');
const adminRoutes = express.Router();

adminRoutes.post('/admin', adminController.adminSignup);

adminRoutes.post(
    '/adminlogin',
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
