const {
  PLEASE_ENTER_EMAIL_PASSWORD,
  PLEASE_ENTER_REQUIRED_FIELD,
} = require("../utils/messages");

const onBoardingDataValidation = {};
onBoardingDataValidation.adminLogin = (req, res, next) => {
  if (Object.keys(req.body).length > 0) {
    if (req.body.email && req.body.password) {
        console.log(req.body);
      next();
    }else{
        return res.json({message:PLEASE_ENTER_REQUIRED_FIELD});
    }
  }
  else{
    return res.json({ message: PLEASE_ENTER_REQUIRED_FIELD });
  }
};
module.exports = onBoardingDataValidation;
