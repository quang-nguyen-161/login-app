import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import User from './models/user.js'; // Ensure this path is correct

dotenv.config({ quiet: true });
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

app.post('/api/register', async (req, res) => {
  const registerData = req.body;
  if (!registerData.username || !registerData.email || !registerData.password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const user = new User(registerData);
    await user.save();
    res.status(201).json({ message: 'tao tai khoan thanh cong' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
})

mongoose.connect(process.env.MONGO_URI);
console.log(process.env.MONGO_URI);




app.listen(5000, () => {
  console.log('Server is running on localhost:5000');
});

