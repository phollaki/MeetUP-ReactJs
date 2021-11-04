const express = require("express");
const { CreateEvent, Events, Recomended, Event, Createdevents, Joinedevents, Delete, Removeuser  } = require("../controllers/event");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/CreateEvent",protect, CreateEvent);
router.get("/Events", protect, Events);
router.get("/Recomended", protect, Recomended);
router.get("/Event", protect, Event);
router.get("/Createdevents", protect, Createdevents);
router.get("/Joinedevents", protect, Joinedevents);
router.get("/Delete", protect, Delete);
router.get("/Removeuser", protect, Removeuser);


module.exports = router;