const { Users_collection } = require("../models/MongoDB_model");
const { error_res } = require("../services/respons_service");
const bcrypt = require("bcryptjs");

const otp_Checking = async (req, res, next) => {
  try {
    const email = req.body?.email
    const otp = req.body?.otp
    ////(email,otp);
    
    
    if (!email) {
      return error_res(res, { status_code: 400, message: "email required" });
    }
    if (!otp) {
      return error_res(res, { status_code: 400, message: "otp required" });
    }
    const user = await Users_collection.findOne({ email }, { password: 0 });
    if (!user) {
      return error_res(res, { status_code: 404, message: "user not found" });
    }
    const { UserName, Otp } = user;
    const { value, CreateAT } = Otp;
    const isValidOTP = await bcrypt.compare(otp, value);
    if (!isValidOTP) {
      // ////("shamimmmmmmmmmmmmmmmmmmmmmmm");
      return error_res(res, { status_code: 400, message: "invalid OTP" });
    }
    if (new Date(CreateAT).getTime() < Date.now()) {
      return error_res(res, { status_code: 404, message: "otp Expired" });
    }
    req.user = user;
    req.isValidOTP = true;
    next();
  } catch (error) {
    error_res(res, { status_code: error.status, message: error.message });
  }
};

module.exports = { otp_Checking };
