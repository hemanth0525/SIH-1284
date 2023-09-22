const mongoose = require('mongoose');

// Define the schema for your Document model
const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  url: {
    type: String,
    required: true, // URL is required
  },
  // You can add other properties here if needed
  category: String, // Example: Document category
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the creation date
  },
});

// Create the Document model
const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
