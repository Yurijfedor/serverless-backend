const express = require("express");
const router = express.Router();
const protectedController = require("../controllers/protectedController");
// task #1
router.get("/", protectedController.getProtectedUserId);
// task #3
router.put("/:json_path", protectedController.saveDataToStorage);
router.get("/:json_path", protectedController.getDataFromStorage);

module.exports = router;
