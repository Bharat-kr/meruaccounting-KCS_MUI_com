import express from 'express';
import { generateReport } from '../controllers/report.js';

import { authPass } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(authPass, generateReport);

export default router;
