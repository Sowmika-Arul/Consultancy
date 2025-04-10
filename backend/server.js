import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Models
import PGStaff from './models/PGStaff.js';
import BTStaff from './models/BTStaff.js';
import SGTStaff from './models/SGTStaff.js';
import PrimaryStaff from './models/PrimaryStaff.js';
import OfficeStaff from './models/OfficeStaff.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Admin Schema & Model
const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const Admin = mongoose.model('Admin', adminSchema, 'admins');

// Admin Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  if (password !== admin.password) {
    return res.status(400).json({ message: 'Invalid password credentials' });
  }

  const token = jwt.sign({ email: admin.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });

  res.json({ message: 'Login successful', token });
});

// Admin Protected Route Example
app.get('/admin-dashboard', (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: `Welcome, ${decoded.email}!` });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

// Event Schema & Model
const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
});
const Event = mongoose.model('Event', eventSchema);

// Create Event
app.post('/events', async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newEvent = new Event({ title, description, imageUrl });
    await newEvent.save();
    res.status(201).json({ message: 'Event saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get All Events
app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Faculty Route
app.get('/api/faculty', async (req, res) => {
  const { type } = req.query;

  try {
    const modelMap = {
      pg_staff: PGStaff,
      bt_staff: BTStaff,
      sgt_staff: SGTStaff,
      primary_staff: PrimaryStaff,
      office_staff: OfficeStaff,
    };

    if (type && type !== 'all') {
      const model = modelMap[type];
      if (!model) {
        return res.status(400).json({ error: 'Invalid staff type' });
      }

      const filtered = await model.find();
      return res.json(filtered.map((f) => ({ ...f.toObject(), type })));
    }

    // If type is 'all', get all and merge
    const allData = await Promise.all([
      PGStaff.find(),
      BTStaff.find(),
      SGTStaff.find(),
      PrimaryStaff.find(),
      OfficeStaff.find(),
    ]);

    const types = ['pg_staff', 'bt_staff', 'sgt_staff', 'primary_staff', 'office_staff'];
    const merged = allData.flatMap((list, index) =>
      list.map((doc) => ({
        ...doc.toObject(),
        type: types[index] || 'unknown',
      }))
    );

    res.json(merged);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch faculty data' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
