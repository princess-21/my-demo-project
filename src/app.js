// app.js (or server.js)

// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();  // To use environment variables

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection URI (stored in .env for security reasons)
const mongoURI = process.env.MONGO_URI;  // Assumes your connection string is in the .env file

// Middleware for parsing JSON bodies (if necessary)
app.use(express.json());

// MongoDB connection
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define routes and other logic here

app.get('/', (req, res) => {
  res.send('Welcome to the Room Management System');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
