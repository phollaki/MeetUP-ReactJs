const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const geocoder = require("../utils/geocoder");
// @desc       Register user
// @route      POST /api/v1/auth/register
// @access     Public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, city, eventType, role, latitude, longitude } =
    req.body;

  // Get location information from latitude & longitude
  const loc = await geocoder.reverse({ lat: latitude, lon: longitude });

  // Define location from geocoder
  const location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    country: loc[0].countryCode,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
  };
  // Create user
  const user = await User.create({
    name,
    email,
    password,
    eventType,
    role,
    location,
  });
  sendTokenResponse(user, 200, res);
});
// @desc       Login user
// @route      POST /api/v1/auth/login
// @access     Public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse("Please provide an email and password"), 400);
  }

  // Check for user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }
  // Check if password matches
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid credentials"), 401);
  }

  sendTokenResponse(user, 200, res);
});

// @desc       Get current user
// @route      POST /api/v1/auth/me
// @access     Private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({ success: true, token, data: user });
};

// @desc       Forgot password
// @route      POST /api/v1/auth/forgotpassword
// @access     Private
exports.forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorResponse(`There is no user with that email`, 404));
  }

  // Get resetToken
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    data: user,
  });
});

// change password
