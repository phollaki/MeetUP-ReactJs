const Onhold = require("../models/Onhold");
const Event = require("../models/Event");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.Join = asyncHandler(async (req, res, next) => {
  const { id } = req.body;

  const join = await Onhold.create({ user: req.user.id, event: id });
  const joinid = join._id;
  const event = await Event.findByIdAndUpdate(id, {
    $push: { request: joinid },
  });

  if (!event) {
    return next(new ErrorResponse(`Event not find with id ${id}`));
  }
  res.status(200).json({
    success: true,
    data: join,
  });
});

// accept join
exports.Acceptjoin = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const onHold = await Onhold.findById(id);
  if (!onHold) {
    return next(new ErrorResponse(`Join is not find with id ${id}`));
  }
  const event = await Event.findByIdAndUpdate(onHold.event, {
    $pull: { request: id },
  });
  const added = await Event.findByIdAndUpdate(onHold.event, {
    $push: { members: onHold.user },
  });
  const removed = await Onhold.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: `User accepted for event`,
  });
});

// decline join
exports.Declinejoin = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const onHold = await Onhold.findById(id);
  if (!onHold) {
    return next(new ErrorResponse(`Join is not find with id ${id}`));
  }
  const event = await Event.findByIdAndUpdate(onHold.event, {
    $pull: { request: id },
  });
  const added = await Event.findByIdAndUpdate(onHold.event, {
    $push: { declined: onHold.user },
  });
  const removed = await Onhold.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    data: `User declined for event`,
  });
});
