const express = require("express");
const router = express.Router();
const storageController = require("../controllers/storageController");

router.put("/:json_path", storageController.saveDataToStorage);
router.get("/:json_path", storageController.getDataFromStorage);

module.exports = router;
