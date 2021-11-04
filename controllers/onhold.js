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
exports.Acceptjoin = asyncHandler(async (req,res,next) => {
  const id= req.params.id
  const removed = await Onhold.findByIdAndDelete(id)
  const event = await Event.findByIdAndUpdate(removed.event, {$pull:{request : id}})
  const added = await Event.findByIdAndUpdate(removed.event, {$push:{members : removed.user}})

})

// decline join
exports.Declinejoin = asyncHandler(async (req,res,next) => {
  const id= req.params.id
  const removed = await Onhold.findByIdAndDelete(id)
  const event = await Event.findByIdAndUpdate(removed.event, {$pull:{request : id}})
})