import asyncHandler from 'express-async-handler';
import User from '../models/user.js';

// @desc
// @route   GET /
// @access  Private

const abc = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const date = req.body.date;
  const hours = req.body.hours;
  const activityLevel = req.body.activityLevel;
  const time = req.body.time;
  const url = req.body.url;
  const taskName = req.body.taskName;

  try {
    const employee = await User.findById(id);

    if (!employee) {
      res.status(404);
      throw new Error(`Employee not found`);
    }
    const day = {
      date: moment('1-12-1995', 'DD-MM-YYYY'),
      hours: hours,
      screenShots: [
        {
          activityLevel: activityLevel,
          url: url,
          time: moment(time, 'DD MM YYYY hh:mm:ss', true),
          taskName: taskName,
        },
      ],
    };
    employee.day.push(day);
    await employee.save();
    res.json({
      status: 'Success',
      data: employee,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// @desc
// @route   GET /timecount
// @access  Private

const con = asyncHandler((req, res) => {
  con;
});

export { abc, con };
