const express = require("express");
const { CreateEvent, Events } = require("../controllers/event");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/CreateEvent",protect, CreateEvent);
router.get("/Events", Events);

module.exports = router;