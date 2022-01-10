import express from 'express';
import { authPass } from '../middleware/authMiddleware.js';
import {
  getEmployeeById,
  deleteEmployee,
  editEmployee,
  getEmployeeList,
} from '../controllers/employee.js';

const router = express.Router();

router.route('/edit/:id').patch(authPass, editEmployee);

router.route('/employeeList').get(authPass, getEmployeeList);

router
  .route('/:id')
  .get(authPass, getEmployeeById)
  .delete(authPass, deleteEmployee);

export default router;
