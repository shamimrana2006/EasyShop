const { Users_collection } = require("../models/MongoDB_model");
const { success_res, error_res } = require("../services/respons_service");
const bcrypt = require("bcryptjs");
const { tokenCreate } = require("../services/tokenGenerator");
const { cookieGenerate } = require("../services/cookiegenarator");
const { CreateHashText } = require("../services/hashing");
const { SendMail } = require("./Nodemailer");
const { otpCreator, OTPHTML, OTP_Service } = require("../services/otpSrvice");
const register_controller = async (req, res) => {
  const { name, UserName, password, repassword } = req.body;
  if (!UserName) {
    return error_res(res, { status_code: 400, message: "UserName is require" });
  }
  const isAlreadyUser = await Users_collection.find({ UserName });
  if (isAlreadyUser.length > 0) {
    return error_res(res, { message: "user already exist" });
  }

  if (!name) {
    return error_res(res, { status_code: 400, message: "name is require" });
  }
  if (!password) {
    return error_res(res, { status_code: 400, message: "password is require" });
  }
  if (password.length < 6) {
    return error_res(res, {
      status_code: 400,
      message: "minimum 6 character required",
    });
  }
  if (
    !password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*<>/]).{6,}$/)
  ) {
    return error_res(res, {
      status_code: 400,
      message:
        "password require at least a uppercase, lowercase, digit and spacial character",
    });
  }
  if (!(password === repassword)) {
    return error_res(res, { status_code: 400, message: "password not match" });
  }
  const emailValue = UserName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    ? UserName
    : "";
  try {
    const hashPassword = await CreateHashText(password);

    const newUser = await new Users_collection({
      name,
      email: emailValue,
      UserName,
      password: hashPassword,
    }).save();

    // --------------------------------
    const token = await tokenCreate(
      newUser.toObject(),
      process.env.SECRETE_JWT_KEY,
      "20m"
    );
    const isSecure = req.secure;
    cookieGenerate(res, {
      cookieName: "token",
      cookieValue: token,
      isSecure,
      maxAge: 20 * 60 * 1000,
    });
    // --------------------------------
    const { CreateAt, email } = newUser;

    success_res(res, {
      status_code: 201,
      message: "user created ",
      payLoad: { name, UserName, CreateAt, email },
    });
  } catch (error) {
    console.log(error);
    // const errorMessage = Object.values(error.errors).map((err) => {
    //   return err.message;
    // });
    error_res(res, { status_code: 400, message: error.message });
  }
};

const login_controller = async (req, res) => {
  try {
    const { UserName, password } = req.body;

    if (!UserName) {
      return error_res(res, { status_code: 401, message: "UserName required" });
    }
    console.time("mongo");
    const findingUser = await Users_collection.findOne({ UserName });
    console.timeEnd("mongo");
    console.log(findingUser);

    if (!findingUser) {
      return error_res(res, { status_code: 400, message: "user not found" });
    }
    if (findingUser) {
      const comparePassword = await bcrypt.compare(
        password,
        findingUser.password
      );
      if (!comparePassword) {
        return error_res(res, { status_code: 400, message: "user not found" });
      }
      if (comparePassword) {
        const token = await tokenCreate(
          (({ password, ...findingUser }) => findingUser)(
            findingUser.toObject()
          ),
          process.env.SECRETE_JWT_KEY,
          "20m"
        );
        const isSecure = req.secure;
        cookieGenerate(res, {
          cookieName: "token",
          cookieValue: token,
          isSecure,
          maxAge: 20 * 60 * 1000,
        });
        const { password, ...userData } = findingUser.toObject(); //mongodb response

        success_res(res, {
          message: "valid user check success",
          status_code: 200,
          payLoad: userData,
        });
      }
    }
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};

// reset db only access super admin
const reset_db_controller = async (req, res) => {
  try {
    await Users_collection.deleteMany();
    success_res(res, {
      status_code: 200,
      message: "successfully reset database",
    });
  } catch (error) {
    error_res(res, { status_code: 401, message: error.message });
  }
};

const profile_controller = (req, res, next) => {
  const { password, ...UserDAta } = req.user.toObject();
  success_res(res, {
    status_code: 200,
    message: "success",
    payLoad: UserDAta,
  });
};

const LogoutAT = async (req, res) => {
  try {
    const user = req.user.toObject();
    if (!user) {
      error_res(res);
    }
    const isSecure = req.secure;
    res.clearCookie("token", {
      path: "/", // যদি সেট করে থাকো
      httpOnly: isSecure, // যদি আগের cookie এ ছিল
      secure: isSecure, // যদি https এ ছিল
      sameSite: isSecure ? "None" : "lax", // optional
    });

    success_res(res, { message: "logout successfully", status_code: 200 });
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};

const otp_sender_verify = async (req, res) => {
  try {
    const { password, ...UserDAta } = req.user.toObject();
    if (UserDAta?.isVerified?.value) {
      console.log(typeof UserDAta?.isVerified?.value);

      return error_res(res, {
        status_code: 401,
        message: {
          message: "already verified account",
          check: UserDAta?.isVerified?.value,
        },
      });
    }

    if (!UserDAta?.email) {
      return error_res(res, {
        status_code: 400,
        message: "user Email required",
      });
    }
    const responseOPTSERvice = await OTP_Service(
      UserDAta?.email,
      "verify account OTP"
    );
    return success_res(res, {
      status_code: 200,
      message: responseOPTSERvice,
    });
  } catch (error) {
    console.log(error);
    error_res(res, { status_code: 400, message: error.message });
  }
};

const verificationUpdating = async (req, res) => {
  try {
    const { UserName } = req.user.toObject();
    if (!req.isValidOTP) {
      error_res(res, {
        status_code: 401,
        message: "otp invalid and unverified",
      });
    }

    await Users_collection.findOneAndUpdate(
      { UserName },
      { "isVerified.value": true }
    );
    success_res(res, {
      status_code: 201,
      message: "verification complete",
      payLoad: UserName,
    });
  } catch (error) {}
};

const CheckAdmin = async (req, res, next) => {
  try {
    const { isAdmin } = req.user.toObject();

    if (!isAdmin) {
      return error_res(res, { status_code: 401, message: "user not admin" });
    }
    next();
  } catch (err) {
    return error_res(res, { status_code: 400, message: "unAuthorized user" });
  }
};

const reset_password_otp = async (req, res) => {
  try {
    const email = req.body?.email;
    if (!email) {
      return error_res(res, { status_code: 404, message: "email required" });
    }
    const user = await Users_collection.findOne({ email });
    console.log(email);
    console.log("ami reset passowrd otp user : ", user);

    if (!user) {
      return error_res(res, { status_code: 400, message: "user not found" });
    }

    const responseOTP = await OTP_Service(email, "Reset Password OTP");
    return success_res(res, {
      status_code: 200,
      message: responseOTP,
    });
  } catch (error) {
    console.log(error);
    error_res(res, {
      status_code: error.status,
      message: "failed to send opt",
    });
  }
};

const reset_password_with_otp = async (req, res) => {
  try {
    if (!req.isValidOTP) {
      return error_res(res, {
        status_code: 401,
        message: "otp invalid and unverified",
      });
    }
    const { email, NewPassword, ConfirmPassword } = req.body;
    if (!NewPassword)
      return error_res(res, {
        message: "new password required",
        status_code: 404,
      });
    if (!ConfirmPassword)
      return error_res(res, {
        message: "new confirm password required",
        status_code: 404,
      });
    if (NewPassword !== ConfirmPassword)
      return error_res(res, {
        message: "NewPassword not match",
        status_code: 401,
      });
    const newPassword = await CreateHashText(NewPassword);
    const user = await Users_collection.findOneAndUpdate(
      { email },
      {
        $set: {
          password: newPassword,
          "isVerified.value": true,
          "isVerified.verifyAT": new Date.now(),
        },
      }
    );
    success_res(res, {
      message: "user password changed successfully",
      status_code: 201,
    });
  } catch (error) {
    error_res(res, { message: error.message, status_code: error.status });
  }
};

const user_updating = async (req, res) => {
  const { password, ...UserDAta } = req.user.toObject();
  const { email, UserName, name } = req.body;
  // if (UserDAta?.isVerified?.value) {
  //   return error_res(res, { message: "user not verified" });
  // }
  if ((email, !UserName, !name)) {
    await Users_collection.findOneAndUpdate(
      { email: UserDAta.email },
      { email }
    );
    return success_res(res, {
      message: "your email changed",
      status_code: 201,
    });
  }
};
module.exports = {
  register_controller,
  login_controller,
  reset_db_controller,
  profile_controller,
  otp_sender_verify,
  verificationUpdating,
  CheckAdmin,
  reset_password_otp,
  reset_password_with_otp,
  user_updating,
  LogoutAT,
};
