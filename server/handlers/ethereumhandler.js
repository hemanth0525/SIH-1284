const Web3 = require('web3');

// Initialize Web3 with your Ethereum provider (e.g., Infura)
const web3 = new Web3('https://mainnet.infura.io/v3/686402ecc53d48b6b97ad1a94666423a');

// Load your Ethereum account and private key
const account = web3.eth.accounts.privateKeyToAccount('686402ecc53d48b6b97ad1a94666423a');

// Set the default sender for transactions
web3.eth.defaultAccount = account.address;

// Ethereum contract ABI and address
const contractABI = []; // Add your contract ABI
const contractAddress = '0xYourContractAddress'; // Replace with your contract address

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Store metadata
metadataStorageContract.methods
    .storeMetadata(ipfsHash, metadata)
    .send({ from: yourAddress, gas: 500000 });

// Retrieve metadata
metadataStorageContract.methods
    .getMetadata(ipfsHash)
    .call()
    .then((result) => {
        console.log('Retrieved Metadata:', result);
    })
    .catch((error) => {
        console.error('Error retrieving metadata:', error);
    });

// Function to store the hash on Ethereum
async function storeHashOnEthereum(hash) {
  try {
    const receipt = await contract.methods.storeHash(hash).send({
      from: account.address,
      gas: '300000', // Set an appropriate gas limit
    });

    return receipt;
  } catch (error) {
    throw error;
  }
}

module.exports = { storeHashOnEthereum };
