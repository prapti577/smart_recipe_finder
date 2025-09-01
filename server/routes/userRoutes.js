const express = require("express");
const router = express.Router();
const User = require("../Models/usermodel");
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'your_secret_key';
const bcrypt = require('bcrypt');
const hashPassword = require('../utils/hashPassword');

// Add new user
router.post("/add", async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    // Hash the password before saving
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = new User({ ...req.body, password: hashedPassword });
    await newUser.save();
    res.status(200).json({ message: "User added successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update user
router.put("/update/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "User updated successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get user (for editing)
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Change login route to POST and use req.body
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }
    // Generate JWT token
    const token = jwt.sign({ userId: user._id, email: user.email }, SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
