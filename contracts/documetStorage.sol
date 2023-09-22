// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetadataStorage {
    mapping(string => string) metadata; // Maps IPFS hash to metadata

    event MetadataStored(string indexed ipfsHash, string metadata);

    function storeMetadata(string memory ipfsHash, string memory _metadata) public {
        metadata[ipfsHash] = _metadata;
        emit MetadataStored(ipfsHash, _metadata);
    }

    function getMetadata(string memory ipfsHash) public view returns (string memory) {
        return metadata[ipfsHash];
    }
}
