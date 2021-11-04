const express = require("express");
const { Join, Acceptjoin, Declinejoin } = require("../controllers/onhold");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/Join", protect, Join);
router.put("/Acceptjoin", protect, Acceptjoin);
router.put("/Declinejoin", protect, Declinejoin);

module.exports = router;