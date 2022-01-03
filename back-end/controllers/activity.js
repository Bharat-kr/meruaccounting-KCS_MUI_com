import Activity from '../models/activity.js';
import User from '../models/user.js';
import Screenshot from '../models/screenshot.js';
import asyncHandler from 'express-async-handler';

// @desc    Add a new screenshot
// @route   POST /activity/screenshot
// @access  Private

//TODO: not tested

const createScreenShot = asyncHandler(async (req, res) => {
  const {
    projectId,
    task,
    image,
    activityAt,
    activityId,
    performanceData,
    title,
  } = req.body;

  const screenshot = await Screenshot.create({
    employee: req.user._id,
    project: projectId,
    task,
    image,
    activityAt,
    activityId,
    performanceData,
    title,
  });

  if (screenshot) {
    const activity = Activity.findById(activityId);
    activity.screenshots.push(screenshot._id.toHexString());
    await activity.save();

    res.status(201).json({
      status: 'success',
      screenshot,
      activity,
    });
  }
});

// @desc    Add a new activity
// @route   POST /activity
// @access  Private

const createActivity = asyncHandler(async (req, res) => {
  const { clientId, task, startTime, endTime, performanceData } = req.body;

  //FIXME: project in model what to do with that
  // no employeeId in activity

  const activity = await Activity.create({
    client: clientId,
    task: task,
    startTime,
    endTime,
  });

  if (activity) {
    const user = await User.findById(req.user._id);

    const date = new Date();
    date.setUTCSeconds(startTime);

    //FIXME: conversion problem

    console.log(typeof startTime);
    const day = Date.parse(startTime).getDate().getTime();

    const epoch = date.getDate().getTime();
    let i = 0;

    for (i = 0; i < user.days.length(); i++) {
      if (user.days[i].date === day) {
        console.log('inside if');
        // user.days[i].activities.push(activity);
        break;
      }
    }
    if (i != 0) {
      user.days[i].activities.push(activity);
    } else {
      user.days.push({
        date: epoch,
        activities: [activity],
      });
    }

    await user.save();

    res.status(201).json({
      status: 'success',
      activity,
      days: user.days,
    });
  } else {
    res.status(500);
    throw new Error('Internal server error');
  }
});

export { createActivity, createScreenShot };
