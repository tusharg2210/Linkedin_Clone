import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoutes from './routes/api/userRoutes.js'; // Make sure this path is correct
import postRoutes from './routes/api/posts.js'; // Make sure this path is correct
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
// These must match your frontend calls
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Simple test route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// THIS IS THE MOST IMPORTANT PART FOR VERCEL
export default app;

// The app.listen part below will ONLY be used for local dev
// Vercel ignores it
const PORT = process.env.PORT || 8000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}