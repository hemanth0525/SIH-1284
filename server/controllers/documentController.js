const Document = require('../models/document.js'); // Import the Document model
const { Router } = require('express');
const router = Router();

// Route to upload a new document
router.post('/upload', async (req, res) => {
  try {
    const { name, url } = req.body; // Assuming you're sending the name and URL from the frontend

    // Create a new document instance
    const newDocument = new Document({
      name,
      url,
      // Add other properties here if needed
    });

    // Save the document to the database
    await newDocument.save();

    res.status(201).json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get a list of documents
router.get('/list', async (req, res) => {
  try {
    // Fetch all documents from the database
    const documents = await Document.find(); // Use Document.find() instead of just find()

    res.status(200).json(documents);
  } catch (error) {
    console.error('Error fetching documents:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; // Export the router using CommonJS syntax
