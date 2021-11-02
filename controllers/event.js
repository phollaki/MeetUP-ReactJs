const Event = require("../models/Event");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.CreateEvent =asyncHandler(async (req,res,next) =>{
    const { type, city, remainingPlayers, description } = req.body;

    //Create Event
    const event = await Event.create({
        type,
        city,
        remainingPlayers,
        description
    });

    res.status(200).json({
        success: true,
        data: event,
    });
})

exports.Events = asyncHandler(async(req,res,next) =>{
    const events = await Post.find().sort({ _id: -1 });

    res.status(200).json({
        success: true,
        data: events,
    });
})
