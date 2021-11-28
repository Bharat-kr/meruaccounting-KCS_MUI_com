const express = require("express");
const router = express.Router();
const { authPass } = require("../controllers/authController");
const { createClient } = require("../controllers/clientController");

router.post("/", authPass, createClient);
router.patch("/");
// router.post("/login", authController.login);

module.exports = router;
