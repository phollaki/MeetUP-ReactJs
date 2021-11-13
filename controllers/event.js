const Event = require("../models/Event");
const User = require("../models/User");
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
exports.publicEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find().sort({ _id: -1 });
  
  res.status(200).json({
    success: true,
    data: events,
  });
});

// events:id
exports.Event = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  res.status(200).json({
    success: true,
    data: event,
  });
});

// createdEvents
exports.Createdevents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ createdBy: req.user });
  res.status(200).json({
    success: true,
    data: events,
  });
});

// joined events
exports.Joinedevents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ members: req.user });
  res.status(200).json({
    success: true,
    data: events,
  });
});
// declined events
exports.Declinedevents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ declined: req.user });
  res.status(200).json({
    success: true,
    data: events,
  });
});
// delete event:id
exports.Delete = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);
  const userId = req.user._id.toString();
  const created = event.createdBy.toString();
  if (created === userId) {
    await Event.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      data: `Event is deleted`,
    });
  } else {
    return next(
      new ErrorResponse(
        `Not authorized for this delete function, not your event`
      )
    );
  }
});

// remove user from event:id
exports.Removeuser = asyncHandler(async (req, res, next) => {
  const eventid = req.params.id;
  const userid = req.body.userid;
  const updated = await Event.findByIdAndUpdate(eventid, {
    $pull: { members: userid },
  });
  res.status(200).json({
    success: true,
    data: updated,
  });

});

// available or not - visible or not