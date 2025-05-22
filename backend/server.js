import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cloudinary from 'cloudinary';
import multer from 'multer';
import jwt from 'jsonwebtoken';
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

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer Storage Setup (using memory storage for Cloudinary upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

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
  date: Date, // Added date field
  imageUrl: String,
});

const Event = mongoose.model('Event', eventSchema);

// Create Event
app.post('/events', async (req, res) => {
  try {
    const { title, description, date, imageUrl } = req.body; // Destructure date
    console.log(req.body);
    const newEvent = new Event({ title, description, date, imageUrl }); // Include date
    await newEvent.save();
    res.status(201).json({ message: 'Event saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.get('/events', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /events/years
app.get('/events/years', async (req, res) => {
  try {
    const years = await Event.aggregate([
      { $group: { _id: { $year: "$date" } } },
      { $sort: { _id: -1 } }
    ]);
    const yearList = years.map(y => y._id);
    res.json(yearList);
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

// Admission Schema & Model
const admissionSchema = new mongoose.Schema({
  name: String,
  gender: String,
  dob: String,
  fatherName: String,
  motherName: String,
  profession: String,
  previousSchool: String,
  address: String,
  phone: String,
  aadhar: String,
  caste: String,
  disability: String,
  admissionStandard: String, 
  photo: String,
  date: String,  
  signature: String, 
});

const Admission = mongoose.model('Admission', admissionSchema);

app.post('/submit-form', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'printedForm', maxCount: 1 }
]), async (req, res) => {
  try {
    let photoUrl = null;
    let pdfUrl = null;

    // Upload photo to Cloudinary if exists
    if (req.files['photo']) {
      const photoFile = req.files['photo'][0];
      photoUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'image' },
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(photoFile.buffer);
      });
    }

    // Upload PDF (printed form) to Cloudinary if exists
    if (req.files['printedForm']) {
      const pdfFile = req.files['printedForm'][0];
      pdfUrl = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { resource_type: 'raw' }, // raw for pdf or other files
          (error, result) => {
            if (error) return reject(error);
            resolve(result.secure_url);
          }
        );
        stream.end(pdfFile.buffer);
      });
    }

    // Prepare data to save
    const admissionData = {
      ...req.body,
      photo: photoUrl,
      printedFormUrl: pdfUrl,  // save the PDF URL here
    };

    // Save to DB
    const admission = new Admission(admissionData);
    await admission.save();

    res.status(200).json({ message: 'Form submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/api/admissions', async (req, res) => {
  try {
    const data = await Admission.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admissions' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
