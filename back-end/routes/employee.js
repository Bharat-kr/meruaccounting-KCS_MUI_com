import express from "express";
import { authPass } from "../middleware/authMiddleware.js";
import { managerPass } from "../middleware/roleMiddleware.js";
import {
  getEmployeeById,
  deleteEmployee,
  editEmployee,
  getEmployeeList,
  getEmployeeDetails,
} from "../controllers/employee.js";

const router = express.Router();

router.route("/:id").get(getEmployeeById).delete(managerPass, deleteEmployee);

// router.route("/allEmployees").post(authPass, getAllEmployee);

router.route("/employeeList").get(authPass, getEmployeeList);

router
  .route("/:id")
  .get(authPass, getEmployeeById)
  .delete(authPass, deleteEmployee);
router.route("/employeeInfo/:id").post(getEmployeeDetails);
router.route("/edit/:id").patch(authPass, editEmployee);

export default router;
