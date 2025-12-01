// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TruePaper {
    struct Certificate {
        string personName;
        string ipfsHash;
        address issuer;
        uint256 timestamp;
        bool isValid;
        bool isRevoked;
    }

    mapping(bytes32 => Certificate) public certificates;
    bytes32[] public allCertificateIds;
    mapping(address => bool) public authorizedIssuers;
    address public owner;

    event CertificateIssued(
        bytes32 indexed certificateId,
        string personName,
        string ipfsHash,
        address indexed issuer,
        uint256 timestamp
    );
    event CertificateRevoked(bytes32 indexed certificateId, address indexed revokedBy);
    event IssuerAuthorized(address indexed issuer);
    event IssuerRevoked(address indexed issuer);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    modifier onlyAuthorized() {
        require(authorizedIssuers[msg.sender] || msg.sender == owner, "Not authorized to issue");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedIssuers[msg.sender] = true;
    }

    function authorizeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = true;
        emit IssuerAuthorized(_issuer);
    }

    function revokeIssuer(address _issuer) external onlyOwner {
        authorizedIssuers[_issuer] = false;
        emit IssuerRevoked(_issuer);
    }

    function issueCertificate(
        string calldata _personName,
        string calldata _ipfsHash
    ) external onlyAuthorized returns (bytes32) {
        bytes32 certificateId = keccak256(
            abi.encodePacked(_personName, _ipfsHash, msg.sender, block.timestamp)
        );

        require(!certificates[certificateId].isValid, "Certificate already exists");

        certificates[certificateId] = Certificate({
            personName: _personName,
            ipfsHash: _ipfsHash,
            issuer: msg.sender,
            timestamp: block.timestamp,
            isValid: true,
            isRevoked: false
        });

        allCertificateIds.push(certificateId);

        emit CertificateIssued(certificateId, _personName, _ipfsHash, msg.sender, block.timestamp);
        return certificateId;
    }

    function verifyCertificate(bytes32 _certificateId)
        external
        view
        returns (
            bool isValid,
            string memory personName,
            string memory ipfsHash,
            address issuer,
            uint256 timestamp,
            bool isRevoked
        )
    {
        Certificate memory cert = certificates[_certificateId];
        return (
            cert.isValid && !cert.isRevoked,
            cert.personName,
            cert.ipfsHash,
            cert.issuer,
            cert.timestamp,
            cert.isRevoked
        );
    }

    function revokeCertificate(bytes32 _certificateId) external {
        Certificate storage cert = certificates[_certificateId];
        require(cert.isValid, "Certificate does not exist");
        require(
            msg.sender == cert.issuer || msg.sender == owner,
            "Only issuer or owner can revoke"
        );

        cert.isRevoked = true;
        emit CertificateRevoked(_certificateId, msg.sender);
    }

    function getAllCertificateIds() external view returns (bytes32[] memory) {
        return allCertificateIds;
    }

    function getCertificateByHash(bytes32 _certificateId)
        external
        view
        returns (Certificate memory)
    {
        return certificates[_certificateId];
    }
}
