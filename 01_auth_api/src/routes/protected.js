const express = require("express");
const router = express.Router();
const protectedController = require("../controllers/protectedController");

router.get("/", protectedController.getProtectedUser);

module.exports = router;
