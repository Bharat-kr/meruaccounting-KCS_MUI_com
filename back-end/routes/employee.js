import express from "express";
import { authPass } from "../middleware/authMiddleware.js";
import { managerPass } from "../middleware/roleMiddleware.js";
import {
  addEmployee,
  getEmployeeById,
  createEmployee,
  deleteEmployee,
  editEmployee,
  getEmployeeList,
} from "../controllers/employee.js";

const router = express.Router();

import moment from "moment";
moment().format();

router.route("/add/:id").patch(addEmployee);
router.route("/:id").get(getEmployeeById).delete(managerPass, deleteEmployee);
router.route("/").post(createEmployee);
router.route("/edit/:id").patch(authPass, editEmployee);
router.route("/employeeList").get(authPass, getEmployeeList);

export default router;
