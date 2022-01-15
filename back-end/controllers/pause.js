import asyncHandler from "express-async-handler";
import User from "../models/user.js";

// @desc To pause Unpause the employee
// @route   Patch /
// @access  Private

const makePause = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  try {
    const employee = await User.findById(userId);

    if (!employee) {
      res.status(404);
      throw new Error(`Employee not found`);
    }
    if (employee.isPaused == true) {
      employee.isPaused = false;
    } else {
      employee.isPaused = true;
    }
    await employee.save();
    res.json({
      status: "Success",
      data: employee,
    });
  } catch (error) {
    throw new Error(error);
  }
});
export { makePause };
