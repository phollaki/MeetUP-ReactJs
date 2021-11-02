const Event = require("../models/Event");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.CreateEvent = asyncHandler(async (req, res, next) => {
  const { type, city, remainingPlayers, description } = req.body;

  //Create Event
  const event = await Event.create({
    type,
    city,
    remainingPlayers,
    description,
    createdBy: req.user,
  });

  res.status(200).json({
    success: true,
    data: event,
  });
});

exports.Events = asyncHandler(async (req, res, next) => {
  const events = await Event.find().sort({ _id: -1 });

  res.status(200).json({
    success: true,
    data: events,
  });
});

// filtered/recommended events protected

// events:id

// createdEvent

// available or not - visible or not

// joined events

// delete event

// delete user from event