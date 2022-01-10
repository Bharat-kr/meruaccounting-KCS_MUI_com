import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import { register, login, commondata } from '../controllers/auth.js';
import { body } from 'express-validator';

const router = express.Router();

router
  .route('/register', [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Please Provide Correct Password'),
  ])
  .post(register);

router.route('/login').post(login);

router.route('/commondata').get(authPass, commondata);

export default router;
