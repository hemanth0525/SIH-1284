// index.js

const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');

const app = express();

mongoose.connect('mongodb+srv://hemanth00405:hemanth25050525@cluster0.uyqmsmd.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());

// Define a route to handle metadata encryption and storage
app.post('/store-metadata', async (req, res) => {
  try {
    const { metadata } = req.body;

    // Generate a random initialization vector (IV)
    const iv = crypto.randomBytes(16);

    // Define your AES encryption key (replace 'your-secret-key' with a secure key)
    const secretKey = 'your-secret-key';

    // Create a cipher with the selected algorithm (AES-256-CBC)
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);

    // Encrypt the metadata
    let encryptedMetadata = cipher.update(metadata, 'utf-8', 'hex');
    encryptedMetadata += cipher.final('hex');

    // Hash the encrypted metadata (using a suitable hash function)
    const hash = crypto.createHash('sha256').update(encryptedMetadata).digest('hex');

    // In this example, we'll create a basic MongoDB model and store the encrypted data and hash
    const Metadata = mongoose.model('Metadata', new mongoose.Schema({
      encryptedData: String,
      hash: String,
    }));

    const newMetadata = new Metadata({ encryptedData: encryptedMetadata, hash });
    await newMetadata.save();

    res.json({ message: 'Metadata stored successfully', hash });
  } catch (error) {
    console.error('Error storing metadata:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
