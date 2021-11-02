const express = require("express");
const { Join } = require("../controllers/onhold");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/Join", protect, Join);

module.exports = router;