const Onhold = require("../models/Onhold");
const Event = require("../models/Event");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

exports.Join = asyncHandler(async(req,res,next) =>{
    const id = req.id

    const join = await Onhold.create({ user: req.user.id, event: id })
    const joinid = join._id
    await Post.findByIdAndUpdate(id, {$push:{request:joinid}})

    res.status(200).json({
        success: true,
        data: join,
    });
})