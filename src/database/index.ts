import mongoose from 'mongoose';
import { env } from '../config/env.js';

export async function connectDB(): Promise<void> {
  try {
    
    const conn = await mongoose.connect(env.MONGODB_URI);
    
    console.log(`MongoDB-Connected: ${conn.connection.host}`);
  } catch (error: unknown) {
    console.error('Error connecting to MongoDB:', error);
    // If the database fails to connect, crashit.
    process.exit(1); 
  }
}