// const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({
      status: "error",
      message: "Email already exists",
    });
  } else {
    bcrypt.hash(req.body.password, 10, async function (err, hashedPassword) {
      if (err) {
        console.log("Erorr is", err);
        res.status(400).json({
          status: "error",
          message: err,
        });
      }

      let user = new User({
        fistName: req.body.fistName,
        lastName: req.body.lastName,
        email: req.body.email,
        role: req.body.role,
        company: req.body.company,
        password: hashedPassword,
      });

      await user.save();
      try {
        await user.save();

        res.status(200).json({
          status: "success",
          message: "Successfully registered User",
        });
      } catch (error) {
        res.status(500).json({
          status: "Failure",
          message: error,
        });
      }
    });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then(async (user) => {
    console.log(user);
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) {
        res.status(400).json({
          status: "error",
          message: "Some error occured",
        });
      }
      if (result) {
        var token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "2d",
        });
        res.status(200).json({
          status: "success",
          message: "Logged In successfully",
          token,
        });
      } else {
        res.status(400).json({
          status: "error",
          message: "Credentials Not Correct",
        });
      }
    });
  });
};

/* ----------------------- DashBoard Protection Route ----------------------- */

const authPass = async (req, res, next) => {
  // 1) Getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log("Inside If of auth Pass");
    console.log(req.headers.authorization);
    console.log(req.headers.authorization.startsWith("Bearer"));

    token = req.headers.authorization.split(" ")[1];
    console.log(token);
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return res.status(400).json({
      message: "You aren't Logged In",
    });
  }

  // 2) Verification token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log("This is decoded", decoded);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return res.status(404).json({
      message: "You aren't Logged In",
    });
  }
  console.log(currentUser);

  // 4) Check if user changed password after the token was issued

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;
  next();
};

module.exports = {
  register,
  login,
  authPass,
};
