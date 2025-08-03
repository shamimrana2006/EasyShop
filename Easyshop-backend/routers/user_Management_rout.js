console.time("register");
require("dotenv").config();
const passport = require("passport");
const {
  register_controller,
  login_controller,
  reset_db_controller,
  profile_controller,
  otp_sender_verify,

  verificationUpdating,
  reset_password_otp,
  reset_password_with_otp,
} = require("../controller/auth-controller");
const { success_res, error_res } = require("../services/respons_service");
const { Users_collection } = require("../models/MongoDB_model");
const { otp_Checking } = require("../middleware/OTP_Cheking");
const userManagement_router = require("express").Router();
const Check_user_log = passport.authenticate("jwt", { session: false });
userManagement_router.post("/registration", register_controller);
userManagement_router.post("/login", login_controller);
userManagement_router.get("/resetDB", reset_db_controller);
userManagement_router.post("/profile", Check_user_log, profile_controller);
userManagement_router.get("/get-otp-verify", Check_user_log, otp_sender_verify);
userManagement_router.post(
  "/check-otp-verify",
  Check_user_log,
  otp_Checking,
  verificationUpdating
);

userManagement_router.post("/reset_password_opt", reset_password_otp);
userManagement_router.post(
  "/reset_password",
  otp_Checking,
  reset_password_with_otp
);

module.exports = {
  userManagement_router,
};
