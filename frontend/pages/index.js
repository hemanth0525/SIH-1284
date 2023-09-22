import Web3 from 'web3';

// Connect to an Ethereum node (replace with your node's URL)
const web3 = new Web3('https://mainnet.infura.io/v3/69fa002ee8bc45668318259ae3ee9c5c');

// Example: Fetch Ethereum accounts
web3.eth.getAccounts()
  .then(accounts => {
    console.log('Ethereum Accounts:', accounts);
  })
  .catch(error => {
    console.error('Error fetching accounts:', error);
  });
