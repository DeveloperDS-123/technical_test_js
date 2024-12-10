// src/utils/database.ts

// TODO: Set up the database connection.

// Hints:
// - Use Mongoose to connect to your MongoDB instance.
// - Create a function to initialize the connection.
// - Use environment variables or a configuration file for the connection URI.

// Example (from a different context):

import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';

const MONGODB_URI= process.env.MONGODB_URI || '';

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      // Mongoose connection options can be specified here
    });
    console.log('Connected to the database');
  } catch (error) {
    console.error('Database connection error:', error);
    // Handle the error appropriately
  }
};


// Note:
// - Remember to call this initialization function before your application starts listening for requests.
