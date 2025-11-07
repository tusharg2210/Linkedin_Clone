import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_ATLAS_URI;
    const clientOptions = { 
      serverApi: { version: '1', strict: true, deprecationErrors: true } 
    };

    // Create a Mongoose client with a MongoClientOptions object
    const conn = await mongoose.connect(uri, clientOptions);
    
    console.log(`Pinged your deployment. You successfully connected to MongoDB! Host: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;