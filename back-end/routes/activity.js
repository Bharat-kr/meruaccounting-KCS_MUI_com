import express from 'express';
import {
  createActivity,
  createScreenShot,
  updateActivity,
} from '../controllers/activity.js';
import { authPass } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(authPass, createActivity);

router.route('/screenshot').post(authPass, createScreenShot);

router.route('/:id').patch(authPass, updateActivity);

export default router;
