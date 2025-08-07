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
  user_updating,
  LogoutAT,
} = require("../controller/auth-controller");
const { otp_Checking } = require("../middleware/OTP_Cheking");
const { theme_toggling } = require("../controller/theme-toggle");
const userManagement_router = require("express").Router();
const Check_user_log = passport.authenticate("jwt", { session: false });

userManagement_router.get("/theme-toggle",Check_user_log, theme_toggling);
userManagement_router.get("/logout",Check_user_log, LogoutAT);
userManagement_router.post("/registration", register_controller);
userManagement_router.post("/login", login_controller);
userManagement_router.get("/resetDB", reset_db_controller);
userManagement_router.get("/profile", Check_user_log, profile_controller);
userManagement_router.get(
  "/verify-account-otp",
  Check_user_log,
  otp_sender_verify
);
userManagement_router.post(
  "/verify-account",
  Check_user_log,
  otp_Checking,
  verificationUpdating
);
userManagement_router.post("/reset-pass-otp", reset_password_otp);
userManagement_router.post(
  "/reset-password",
  otp_Checking,
  reset_password_with_otp
);
userManagement_router.post("/update-user-info", Check_user_log, user_updating);

module.exports = {
  userManagement_router,
};
