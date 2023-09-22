const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const documentController = require('./controllers/documentController'); // Import your document controller
const { hashMetadata } = require('./metadataHandler');
const { uploadToIPFS } = require('./ipfsHandler');
const { storeHashOnEthereum } = require('./ethereumHandler');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Connect to local MongoDB
mongoose.connect('mongodb://localhost:27017/your-database-name', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit the process if there's a connection error
});

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

// Routes
app.use('/documents', documentController);

// Define a route to handle metadata uploads
app.post('/upload-metadata', async (req, res) => {
  try {
    const { metadata } = req.body;

    // Upload metadata to IPFS
    const ipfsHash = await uploadToIPFS(metadata);

    // Hash the metadata
    const metadataHash = hashMetadata(metadata);

    // Store the hash on Ethereum
    const receipt = await storeHashOnEthereum(metadataHash);

    res.json({ message: 'Metadata uploaded successfully', ipfsHash, ethereumTransactionHash: receipt.transactionHash });
  } catch (error) {
    console.error('Error handling metadata upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
