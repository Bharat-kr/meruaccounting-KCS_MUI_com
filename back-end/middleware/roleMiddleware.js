import asyncHandler from 'express-async-handler';

const managerPass = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.role === 'manager') {
      next();
    } else {
      throw new Error('You are not a manager');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

const adminPass = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.role === 'admin') {
      next();
    } else {
      throw new Error('You are not a admin');
    }
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { managerPass, adminPass };
