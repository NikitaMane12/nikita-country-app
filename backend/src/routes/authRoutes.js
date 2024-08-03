const express = require("express");
const User = require("../model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");

userRouter.post("/", async (req, res) => {
  const saltRound = 10;
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const hashPassword = await bcrypt.hash(password, saltRound);
    const isUser = new User({ username, password: hashPassword });
    await isUser.save();
    res.status(201).json({ isUser });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});
userRouter.get("/register", (req, res) => {
  res.send("Registration endpoint is available");
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const token = jwt.sign({ id: user._id, email: user.email }, "secret", {
          expiresIn: "1h",
        });
        res.status(200).json({ message: "Login successful", token });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Something went wrong", error: err.message });
  }
});

module.exports = { userRouter };
