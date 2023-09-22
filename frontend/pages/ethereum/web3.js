import Web3 from 'web3';

// Replace 'YOUR_INFURA_API_KEY' with your actual Infura API key
const infuraApiKey = '69fa002ee8bc45668318259ae3ee9c5c';

// Create a Web3 instance with Infura as the provider
const web3 = new Web3(`https://mainnet.infura.io/v3/${infuraApiKey}`);

// Example: Check Ethereum network ID
web3.eth.net.getId()
  .then((networkId) => {
    console.log(`Connected to Ethereum network with ID: ${networkId}`);
  })
  .catch((error) => {
    console.error('Error connecting to Ethereum network:', error);
  });

// Use 'web3' to interact with Ethereum in your React or Next.js components
