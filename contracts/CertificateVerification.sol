// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CertificateVerification {
    address public owner;
    
    struct Certificate {
        string ipfsHash;        // IPFS hash of certificate data
        address issuer;         // Address that issued the certificate
        uint256 issuedAt;       // Timestamp of issuance
        bool isValid;           // Whether certificate is still valid
        string recipientName;   // Name of certificate recipient
        string courseName;      // Name of course/certification
    }
    
    // Mapping from certificate ID to Certificate
    mapping(bytes32 => Certificate) public certificates;
    
    // Mapping to track authorized issuers
    mapping(address => bool) public authorizedIssuers;
    
    // Events
    event CertificateIssued(bytes32 indexed certificateId, string ipfsHash, address indexed issuer, string recipientName);
    event CertificateRevoked(bytes32 indexed certificateId, address indexed revokedBy);
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner, "Not authorized to issue certificates");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }
    
    /// @notice Authorize a new issuer
    /// @param _issuer Address to authorize
    function authorizeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer);
    }
    
    /// @notice Revoke an issuer's authorization
    /// @param _issuer Address to revoke
    function revokeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer);
    }
    
    /// @notice Issue a new certificate
    /// @param _ipfsHash IPFS hash containing certificate details
    /// @param _recipientName Name of the recipient
    /// @param _courseName Name of the course/certification
    /// @return certificateId The unique ID of the certificate
    function issueCertificate(
        string memory _ipfsHash,
        string memory _recipientName,
        string memory _courseName
    ) external onlyAuthorizedIssuer returns (bytes32) {
        bytes32 certificateId = keccak256(
            abi.encodePacked(_ipfsHash, msg.sender, block.timestamp, _recipientName)
        );
        
        require(certificates[certificateId].issuedAt == 0, "Certificate already exists");
        
        certificates[certificateId] = Certificate({
            ipfsHash: _ipfsHash,
            issuer: msg.sender,
            issuedAt: block.timestamp,
            isValid: true,
            recipientName: _recipientName,
            courseName: _courseName
        });
        
        emit CertificateIssued(certificateId, _ipfsHash, msg.sender, _recipientName);
        
        return certificateId;
    }
    
    /// @notice Revoke a certificate
    /// @param _certificateId The ID of the certificate to revoke
    function revokeCertificate(bytes32 _certificateId) external {
        Certificate storage cert = certificates[_certificateId];
        require(cert.issuedAt != 0, "Certificate does not exist");
        require(cert.issuer == msg.sender || msg.sender == owner, "Not authorized to revoke");
        require(cert.isValid, "Certificate already revoked");
        
        cert.isValid = false;
        emit CertificateRevoked(_certificateId, msg.sender);
    }
    
    /// @notice Verify a certificate
    /// @param _certificateId The ID of the certificate to verify
    /// @return isValid Whether the certificate is valid
    /// @return ipfsHash The IPFS hash of the certificate
    /// @return issuer The address that issued the certificate
    /// @return issuedAt The timestamp when the certificate was issued
    /// @return recipientName The name of the recipient
    /// @return courseName The name of the course
    function verifyCertificate(bytes32 _certificateId) external view returns (
        bool isValid,
        string memory ipfsHash,
        address issuer,
        uint256 issuedAt,
        string memory recipientName,
        string memory courseName
    ) {
        Certificate memory cert = certificates[_certificateId];
        require(cert.issuedAt != 0, "Certificate does not exist");
        
        return (
            cert.isValid,
            cert.ipfsHash,
            cert.issuer,
            cert.issuedAt,
            cert.recipientName,
            cert.courseName
        );
    }
    
    /// @notice Check if a certificate exists
    /// @param _certificateId The ID to check
    /// @return exists Whether the certificate exists
    function certificateExists(bytes32 _certificateId) external view returns (bool) {
        return certificates[_certificateId].issuedAt != 0;
    }
}
