import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import {
  sendNotification,
  readNotification,
} from '../controllers/notification.js';

const router = express.Router();

router.route('/:id').post(sendNotification).patch(authPass, readNotification);

export default router;
