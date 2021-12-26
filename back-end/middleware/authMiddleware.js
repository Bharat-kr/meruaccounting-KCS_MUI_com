import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

const authPass = asyncHandler(async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    } else {
      res.status(400);
      throw new Error('No token passed in');
    }

    if (!token) {
      res.status(400);
      throw new Error("You aren't Logged In");
    }

    // 2) Verification token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      res.status(400);
      throw new Error('Incorrect JWT');
    }

    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id).select('-password');
    if (!currentUser) {
      res.status(404);
      throw new Error("You arent't logged in ");
    }

    // 4) Check if user changed password after the token was issued

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { authPass };
