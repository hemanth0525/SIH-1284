const Web3 = require('web3');
const IPFS = require('ipfs-http-client');
const MongoDB = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Initialize Web3 with your Ethereum node URL
const web3 = new Web3('https://mainnet.infura.io/v3/69fa002ee8bc45668318259ae3ee9c5c');

// Create an IPFS client using Temporal's public gateway
const ipfs = IPFS.create({ host: 'ipfs.io/k51qzi5uqu5dmdkogwphr0k523etfk31hxe7jey3hy6em6wlzi6xirdsfu7ek4', port: 443, protocol: 'https' });


// MongoDB connection URI
const mongoUri = 'mongodb+srv://hemanth00405:hemanth25050525@cluster0.uyqmsmd.mongodb.net/'; // Replace with your MongoDB connection URI

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Upload metadata to IPFS and store in MongoDB
async function uploadMetadataToIPFSAndStoreInMongo(metadata) {
  try {
    // Add the metadata to IPFS
    const { cid } = await ipfs.add(metadata);

    // Store the IPFS hash (CID) and metadata in MongoDB
    const client = new MongoDB.MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db('your-db-name'); // Replace with your database name
    const collection = database.collection('metadata'); // Replace with your collection name

    const result = await collection.insertOne({
      metadata,
      ipfsHash: cid.toString(),
    });

    console.log('Metadata stored in MongoDB:', result.insertedId);
  } catch (error) {
    console.error('Error uploading metadata to IPFS and storing in MongoDB:', error);
  }
}

// Define a route to handle metadata uploads
app.post('/upload-metadata', async (req, res) => {
  try {
    const { metadata } = req.body;

    // Call the function to upload metadata to IPFS and store in MongoDB
    await uploadMetadataToIPFSAndStoreInMongo(metadata);

    res.json({ message: 'Metadata upload initiated' });
  } catch (error) {
    console.error('Error handling metadata upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Define a route to retrieve metadata by IPFS hash
app.get('/get-metadata/:ipfsHash', async (req, res) => {
  try {
    const ipfsHash = req.params.ipfsHash;
    const client = new MongoDB.MongoClient(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await client.connect();
    const database = client.db('your-db-name'); // Replace with your database name
    const collection = database.collection('metadata'); // Replace with your collection name

    const metadataEntry = await collection.findOne({ ipfsHash });

    if (!metadataEntry) {
      res.status(404).json({ error: 'Metadata not found' });
    } else {
      res.json(metadataEntry.metadata);
    }
  } catch (error) {
    console.error('Error retrieving metadata:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
