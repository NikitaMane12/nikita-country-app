const express = require("express");
const {
  addHistory,
  getHistory,
} = require("../Controller/historyController.js");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, addHistory);
router.get("/", protect, getHistory);

module.exports = router;
