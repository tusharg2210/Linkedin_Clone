import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/api/userRoutes.js';
import postRoutes from './routes/api/posts.js';
import connectDB from './config/db.js';

// Load env vars
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To accept JSON data in the body

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

export default app;

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
