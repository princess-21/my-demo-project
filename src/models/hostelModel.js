const mongoose = require('mongoose');

// Define the Hostel schema
const hostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rooms: {
    type: Number,
    required: true
  }
});

// Create the Hostel model based on the schema
const Hostel = mongoose.model('Hostel', hostelSchema);

// Export the model
module.exports = Hostel;
