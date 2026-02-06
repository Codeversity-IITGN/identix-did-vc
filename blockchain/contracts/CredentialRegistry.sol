// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/**
 * @title CredentialRegistry
 * @dev Smart contract for anchoring and managing verifiable credentials on-chain
 */
contract CredentialRegistry {
    // Events
    event CredentialAnchored(bytes32 indexed credentialHash, address indexed issuer, uint256 timestamp);
    event CredentialRevoked(bytes32 indexed credentialHash, address indexed issuer, uint256 timestamp);
    
    // Structs
    struct CredentialRecord {
        bytes32 credentialHash;
        address issuer;
        uint256 timestamp;
        bool isRevoked;
        uint256 revokedAt;
    }
    
    // State variables
    mapping(bytes32 => CredentialRecord) public credentials;
    mapping(address => bool) public authorizedIssuers;
    address public owner;
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not an authorized issuer");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }
    
    /**
     * @dev Authorize an issuer
     * @param issuer Address of the issuer to authorize
     */
    function authorizeIssuer(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = true;
    }
    
    /**
     * @dev Revoke issuer authorization
     * @param issuer Address of the issuer to revoke
     */
    function revokeIssuerAuthorization(address issuer) external onlyOwner {
        authorizedIssuers[issuer] = false;
    }
    
    /**
     * @dev Anchor a credential hash to the blockchain
     * @param credentialHash Hash of the credential to anchor
     */
    function anchorCredential(bytes32 credentialHash) external onlyAuthorizedIssuer {
        require(credentials[credentialHash].timestamp == 0, "Credential already anchored");
        
        credentials[credentialHash] = CredentialRecord({
            credentialHash: credentialHash,
            issuer: msg.sender,
            timestamp: block.timestamp,
            isRevoked: false,
            revokedAt: 0
        });
        
        emit CredentialAnchored(credentialHash, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Verify if a credential is anchored
     * @param credentialHash Hash of the credential to verify
     * @return bool True if credential is anchored and not revoked
     */
    function verifyCredential(bytes32 credentialHash) external view returns (bool) {
        CredentialRecord memory record = credentials[credentialHash];
        return record.timestamp > 0 && !record.isRevoked;
    }
    
    /**
     * @dev Revoke a credential
     * @param credentialHash Hash of the credential to revoke
     */
    function revokeCredential(bytes32 credentialHash) external {
        CredentialRecord storage record = credentials[credentialHash];
        require(record.timestamp > 0, "Credential not found");
        require(record.issuer == msg.sender, "Only issuer can revoke");
        require(!record.isRevoked, "Credential already revoked");
        
        record.isRevoked = true;
        record.revokedAt = block.timestamp;
        
        emit CredentialRevoked(credentialHash, msg.sender, block.timestamp);
    }
    
    /**
     * @dev Check if a credential is revoked
     * @param credentialHash Hash of the credential to check
     * @return bool True if credential is revoked
     */
    function isRevoked(bytes32 credentialHash) external view returns (bool) {
        return credentials[credentialHash].isRevoked;
    }
    
    /**
     * @dev Get credential details
     * @param credentialHash Hash of the credential
     * @return CredentialRecord struct with credential details
     */
    function getCredential(bytes32 credentialHash) external view returns (CredentialRecord memory) {
        return credentials[credentialHash];
    }
}
