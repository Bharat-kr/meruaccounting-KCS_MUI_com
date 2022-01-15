import User from "../models/user.js";
import generateToken from "../utils/generateToken.js";
import asyncHandler from "express-async-handler";

// @desc    Register new user
// @route   POST /register
// @access  Public

const register = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    role: req.body.role,
    isManager: req.body.isManager,
    password: req.body.password,
  });

  if (user) {
    res.status(201).json({
      status: "success",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.role,
        settings: user.settings,
      },
      token: generateToken(user._id),
    });
  } else {
    throw new Error(
      "There was a problem in creating a new account. Please contact administrator"
    );
  }
});

// @desc    Login user
// @route   POST /login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error("Missing credentials");
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      status: "success",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid email or password");
  }
});

// @desc    Get common data
// @route   GET /commondata
// @access  Private

const commondata = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select("-password")
      .populate({
        path: "days",
        populate: {
          path: "activities",
          model: "Activity",
          populate: {
            path: "screenshots",
            model: "Screenshot",
            select: ["-employee", "-activityId"],
          },
        },
      });

    if (!user) {
      res.status(404);
      throw new Error("No such user found");
    }

    res.status(200).json({
      status: "Fetched common data",
      user,
    });
  } catch (error) {
    throw new Error(error);
  }
});

export { login, register, commondata };
