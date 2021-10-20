import { Router } from "express";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = Router();

const TOKEN_SECRET = 'Token secret szoveg'

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
  type: { type: String },
  city: { type: String, required: true },
  startingTime: { type: Date, required: true , default: Date.now},
  remainingPlayers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  description: { type: String },
  request: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'onhold',
  }
});

const onholdSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
})

const Post = mongoose.model("Post", postSchema);
const User = mongoose.model("User", userSchema);
const Onhold = mongoose.model("OnHold", onholdSchema);

const authentication = async (req, res, next) => {
  const token = req.headers?.authorization?.replace('Bearer ', '')
  console.log(token)
  try {
    const { userId } = await jwt.verify(token, TOKEN_SECRET)
    req.user = userId
    next()
  } catch (error) {
    res.json("Log in first")
  }
}

router.get('/Usercheck', authentication,  async (req, res) => {
  const user = await User.findOne({_id : req.user})
  console.log(user)
  res.json("OK")
})

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
      const token = await jwt.sign({ userId: user.id }, TOKEN_SECRET, {
      })
      res.json({ token })
    }
  }
});


router.post("/createEvent", authentication, async (req, res) => {
  const { type, city, remainingPlayers, description } =
    req.body;
  await Post.create({
    type,
    city,
    remainingPlayers,
    createdBy: req.user,
    description,
  });
  res.json("Succes")
});

router.get("/Events", async (req, res) => {
  const posts = await Post.find().sort({ _id: -1 });
  res.json(posts);
});

router.post('/Onhold', authentication , async (req, res) => {
  const id  = req.body
  const join = await Onhold.create({ user: req.user, event: id })
  const joinid = join._id
  await Post.findByIdAndUpdate(id, {$push:{request:joinid}})
  res.json("Join request send")
})

export default router;
