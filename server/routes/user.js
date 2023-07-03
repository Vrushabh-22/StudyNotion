const express = require("express");
const router = express.Router();

const {sendOTP, signUp, login, changePass} = require("../controllers/Auth");
const {auth} = require("../middlewares/Auth");
const {contactUs} = require("../controllers/ContactUS")

router.post("/sendotp", sendOTP);
router.post("/signup", signUp);
router.post("/login", login);
router.post("/changePassword", auth, changePass);

//reset pass routes
const {resetToken, resetPassword} = require("../controllers/ResetPass");

router.post("/resetPasswordToken", resetToken);
router.post("/resetPassword", resetPassword);


//feedback OR contactUS
router.post("/contactus", contactUs);


module.exports = router