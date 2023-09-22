const IPFS = require('ipfs-http-client');

// Create an IPFS client using the appropriate host, port, and protocol
const ipfs = IPFS.create({
  host: 'ipfs.io', // Replace with the IPFS host
  port: 443,       // Replace with the IPFS port
  protocol: 'https',
});

// Function to upload data to IPFS and get the CID (Content Identifier)
async function uploadToIPFS(data) {
  try {
    const { cid } = await ipfs.add(data);
    return cid.toString();
  } catch (error) {
    throw error;
  }
}

module.exports = { uploadToIPFS };
