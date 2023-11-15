const express = require("express");
const router = express.Router();
const shortLinkerController = require("../controllers/shortLinkerController");

router.post("/shorten", shortLinkerController.makeShortLInk);
router.get("/:shortId", shortLinkerController.getOriginalUrl);

module.exports = router;
