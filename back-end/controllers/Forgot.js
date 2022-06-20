import sgMail from "@sendgrid/mail";
import asyncHandler from "express-async-handler";
import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";

// @desc    Send Forgot Email
// @route   Post /Forgot
// @access  Public

const forgotPassword = asyncHandler(async (req, res) => {
  try {
    const email = await req.body.email;
    const user = await User.find({ email: email });

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: "it.meru02@gmail.com",
      subject: "Forgot Password",
      text: `Hey , visit this link to create a new Password  http://localhost:3000/passwordReset/${
        user[0]._id
      }/${generateToken(user[0]._id)}`,
    };
    if (typeof user[0] !== "undefined" && user[0] !== null) {
      var statusCode;
      await sgMail
        .send(msg)
        .then((response) => {
          statusCode = response[0].statusCode;
        })
        .catch((err) => {
          console.log(err);
        });
      res.status(statusCode).json({
        message: "Email Sent Successfully",
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});

// @desc    Reset Password
// @route   Post /Reset
// @access  Public

const ResetPassword = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    user.password = req.body.newPassword;
    await user.save();
    res.status(200).json({
      message: "Password changed successfully",
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { forgotPassword, ResetPassword };
