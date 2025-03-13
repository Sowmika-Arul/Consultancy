import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Admin Schema
const adminSchema = new mongoose.Schema({
  email: String,
  password: String, // Hashed password
});

const Admin = mongoose.model("Admin", adminSchema, "admins"); 

// Admin Login
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // const isPasswordValid = await bcrypt.compare(password, admin.password);
  if (password != admin.password) {
    return res.status(400).json({ message: "Invalid password credentials" });
  }

  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

  res.json({ message: "Login successful", token });
});

// Protected Route Example
app.get("/admin-dashboard", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome, ${decoded.email}!` });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});


// Event Model
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});

const Event = mongoose.model("Event", eventSchema);

// Create Event
app.post("/events", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newEvent = new Event({ title, description, imageUrl });
    await newEvent.save();
    res.status(201).json({ message: "Event saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
