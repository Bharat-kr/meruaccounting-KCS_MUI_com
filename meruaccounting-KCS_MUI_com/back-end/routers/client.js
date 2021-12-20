const express = require("express");
const router = express.Router();
const { authPass } = require("../controllers/authController");
const {
  createClient,
  getClient,
  getClientProjects,
  deleteClient,
  editClient,
} = require("../controllers/clientController");

router.post("/", authPass, createClient);
router.patch("/", authPass, editClient);
router.get("/getClient", authPass, getClient);
router.get("/getClientProjects", authPass, getClientProjects);
router.delete("/", authPass, deleteClient);

// router.post("/login", authController.login);

module.exports = router;
