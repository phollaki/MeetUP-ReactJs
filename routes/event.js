const express = require("express");
const {
  CreateEvent,
  Events,
  Event,
  Createdevents,
  Joinedevents,
  Delete,
  Removeuser,
  Declinedevents,
  publicEvents
} = require("../controllers/event");

const router = express.Router();

const { protect } = require("../middleware/auth");

router.post("/CreateEvent", protect, CreateEvent);
router.get("/Events", protect, Events);
router.get("/EventsPublic", Events);
router.get("/Event/:id", protect, Event);
router.get("/Createdevents", protect, Createdevents);
router.get("/Joinedevents", protect, Joinedevents);
router.get("/Declinedevents", protect, Declinedevents);
router.delete("/Delete/:id", protect, Delete);
router.get("/Removeuser", protect, Removeuser);

module.exports = router;
