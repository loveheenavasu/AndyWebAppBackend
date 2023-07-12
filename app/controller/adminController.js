const {generateToken, decryptToken} = require('../helper/commonFunctions');
const {findOneAdmin, createAdmin} = require('../services/adminServices');
const {
  findOneSession,
  createSession,
} = require('../services/sessionServices');
const {findOneUser} = require('../services/userServices');
const MESSAGES = require('../utils/messages');

const adminController = {};

/**
 * admin can create his account
 * @param {*} req
 * @param {*} res
 */
adminController.adminLogin = async (req, res) => {
  try {
    const payload = req.body;
    const admin = await findOneAdmin({
      email: payload.email,
      password: payload.password,
    });
    if (!admin) {
      return res.status(401).json({message: MESSAGES.INVALID_CREDENTIALS});
    }
    const token = await findOneSession(
        {userId: admin._id},
        {userId: 1, token: 1},
    );
    res.status(200).json({message: {token}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

/**
 * admin can create his account
 * @param {*} req
 * @param {*} res
 */
adminController.adminSignup = async (req, res) => {
  try {
    const adminExist = await findOneAdmin({email: req.body.email});
    if (adminExist) {
      return res.status(409).json({message: MESSAGES.EMAIL_EXIST});
    }
    const admin = await createAdmin(req.body);
    const token = await generateToken({_id: admin._id});
    const session = {
      userId: admin._id,
      token: token,
      userType: 'admin',
    };
    await createSession(session);
    return res.status(201).json({message: {_id: admin._id, token: token}});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

/**
 * for encrypting userId and generating the token
 * @param {*} req
 * @param {*} res
 */
adminController.encryptToken = async (req, res) => {
  try {
    const token = await generateToken({_id: req.body.userId});
    return res.status(201).json({message: token});
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

/**
 * for decrypting the token and getting the profile of user
 * @param {*} req
 * @param {*} res
 */
adminController.decrytToken = async (req, res) => {
  try {
    const userId = await decryptToken(req.body.token);
    const user = await findOneUser({_id: userId._id});
    if (user) {
      return res.status(200).json({message: user});
    } else {
      return res.status(498).json({message: MESSAGES.INVALID_TOKEN});
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: MESSAGES.INTERNAL_SERVER_ERROR});
  }
};

module.exports = adminController;
