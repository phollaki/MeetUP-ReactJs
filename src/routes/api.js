import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

router.get("/heartbeat", async (req, res) => {
  res.json({ connection: "true" });
});

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, select: false, unique: true },
  password: { type: String, select: false, required: true },
  city: { type: String },
  eventType: { type: [String] },
  registeredAt: { type: Date, default: Date.now, select: false },
});

const postSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  type: { type: String },
  city: { type: String, required: true },
  startingTime: { type: Date, required: true },
  remainingPlayers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  description: { type: String },
});

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);

router.post("/registration", async (req, res) => {
  const { email, password, city, eventType } = req.body;
  if (password.length < 8 || password.length > 16) {
    res.json("Password is not ok");
  }
  if (
    !email.includes("@") ||
    (!email.endsWith(".com") && !email.endsWith(".hu"))
  ) {
    res.json("Email is not ok");
  }
  const emailcheck = await User.findOne({ email });
  if (emailcheck) {
    res.json("Email already used");
  } else {
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashed, city, eventType });
    res.json("Registration completed successfully");
  }
});
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.json("Wrong email");
  } else {
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.json("Wrong password");
    } else {
      res.json("beléptél");
    }
  }
});

router.post("/createEvent", async (req, res) => {
  const { id, type, city, startingTime, remainingPlayers, description } =
    req.body;
  await Post.create({
    id,
    type,
    city,
    startingTime,
    remainingPlayers,
    description,
  });
});

router.get("/Events", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

export default router;
