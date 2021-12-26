import express from 'express';
import { abc, con } from '../controllers/employeeTimeTracking';

const router = express.Router();

import moment from 'moment';
moment().format();

router.get('/:id', abc);
router.get('/timeCount', con);

export default router;
