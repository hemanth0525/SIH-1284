// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DocumentRegistry {
    address public owner;
    uint256 public documentIdCounter;

    // Mapping to store document hashes by document ID
    mapping(uint256 => string) public documentHashes;

    event DocumentStored(uint256 indexed documentId, string ipfsHash);

    constructor() {
        owner = msg.sender;
        documentIdCounter = 1;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can call this function");
        _;
    }

    // Function to store a document hash
    function storeDocumentHash(string memory ipfsHash) public onlyOwner {
        require(bytes(ipfsHash).length > 0, "IPFS hash cannot be empty");

        uint256 documentId = documentIdCounter;
        documentHashes[documentId] = ipfsHash;
        documentIdCounter++;

        emit DocumentStored(documentId, ipfsHash);
    }

    // Function to retrieve the document hash for a given document ID
    function getDocumentHash(uint256 documentId) public view returns (string memory) {
        return documentHashes[documentId];
    }
}
