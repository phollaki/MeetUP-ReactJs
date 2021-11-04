const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  startingTime: {
    type: Date,
    required: true,
    default: Date.now,
  },
  remainingPlayers: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  description: { type: String },
  request: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "onhold",
  },
  members: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  declined: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
});

module.exports = mongoose.model("Event", EventSchema);
