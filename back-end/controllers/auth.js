import User from '../models/user.js';
import generateToken from '../utils/generateToken.js';
import asyncHandler from 'express-async-handler';

// @desc    Register new user
// @route   POST /register
// @access  Public

const register = asyncHandler(async (req, res) => {
  const userExists = await User.findOne({ email: req.body.email });

  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
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
      status: 'success',
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastname: user.lastName,
        email: user.email,
        role: user.role,
      },
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Login user
// @route   POST /login
// @access  Public

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401);
    throw new Error('Missing credentials');
  }

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      status: 'success',
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
    throw new Error('Invalid email or password');
  }
});

// @desc    Get common data
// @route   GET /commondata
// @access  Private

const commondata = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error('No such user found');
    }

    res.json({
      user,
    });
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { login, register, commondata };