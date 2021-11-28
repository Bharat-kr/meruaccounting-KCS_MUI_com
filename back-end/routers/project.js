const express = require("express");
const router = express.Router();
const { authPass } = require("../controllers/authController");
const { createClient } = require("../controllers/clientController");
const {
  createProject,
  projectTeam,
} = require("../controllers/projectController");

router.post("/", authPass, createProject);
router.patch("/", authPass, projectTeam);
// router.post("/login", authController.login);

module.exports = router;
