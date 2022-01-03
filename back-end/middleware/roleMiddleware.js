import asyncHandler from 'express-async-handler';
// it should be user after authPass because it doesnt set req.user
// not implemented right now but file is ready

const managerPass = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.role === 'manager') {
      next();
    }
    throw new Error('You are not a manager');
  } catch (error) {
    res.status(500);
    throw new Error(error);
  }
});

export { managerPass };
