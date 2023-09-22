// server/controllers/uploadController.js

const IPFS = require('ipfs-http-client');
const ipfs = IPFS.create({ host: 'ipfs.io', port: 443, protocol: 'https' });

router.post('/upload-document', async (req, res) => {
  try {
    // Get the uploaded document (req.file)
    // Upload it to IPFS
    const fileBuffer = Buffer.from(req.file.buffer);
    const { cid } = await ipfs.add(fileBuffer);

    // Store the CID and metadata in MongoDB
    const newDocument = new Document({
      name: req.body.name,
      description: req.body.description,
      ipfsHash: cid.toString(),
      // ...other metadata
    });

    await newDocument.save();

    res.json({ message: 'Document uploaded successfully', document: newDocument });
  } catch (error) {
    console.error('Error uploading document:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
