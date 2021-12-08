const express = require("express");
const router = express.Router();
const { authPass } = require("../controllers/authController");
const {
  createClient,
  getClient,
  getClientProjects,
} = require("../controllers/clientController");

router.post("/", authPass, createClient);
router.patch("/");
router.get("/getClient", authPass, getClient);
router.get("/getClientProjects", authPass, getClientProjects);
// router.post("/login", authController.login);

module.exports = router;
