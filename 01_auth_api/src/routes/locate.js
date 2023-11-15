const express = require("express");
const router = express.Router();
const locateController = require("../controllers/locateController");

router.get("/", locateController.getUserLocationByIp);

module.exports = router;
