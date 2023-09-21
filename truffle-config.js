// truffle-config.js

const HDWalletProvider = require('@truffle/hdwallet-provider');

// Set your mnemonic and Infura project ID
const mnemonic = 'your-mnemonic-phrase';
const infuraProjectId = '69fa002ee8bc45668318259ae3ee9c5c';

module.exports = {
    networks: {
        development: {
            host: "localhost",     // Update this to match your Ethereum client (e.g., Ganache)
            port: 8545,            // Update this to match the RPC port of your Ethereum client
            network_id: "*",       // Match any network ID
        },
        // Add more network configurations for other environments (e.g., mainnet, testnets)
        ropsten: {
            provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${infuraProjectId}`),
            network_id: 3,          // Ropsten's network ID
            gas: 5500000,           // Gas limit
        },
        mainnet: {
            provider: () => new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraProjectId}`),
            network_id: 1,          // Ethereum mainnet's network ID
            gas: 7000000,           // Gas limit
        },
    },
    compilers: {
        solc: {
            version: "^0.8.0", // Specify the Solidity compiler version you're using
        },
    },
};
