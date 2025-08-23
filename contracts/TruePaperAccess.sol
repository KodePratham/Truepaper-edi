// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

/// @title TruePaperAccess - Basic access control and payment contract for TruePaper on BSC
contract TruePaperAccess {
    address public owner;
    mapping(address => bool) public hasAccess;
    uint256 public accessFee; // in wei

    event AccessPurchased(address indexed user, uint256 amount);
    event AccessRevoked(address indexed user);
    event AccessFeeChanged(uint256 newFee);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }

    constructor(uint256 _accessFee) {
        owner = msg.sender;
        accessFee = _accessFee;
    }

    /// @notice Purchase access to the system
    function purchaseAccess() external payable {
        require(msg.value >= accessFee, "Insufficient fee");
        hasAccess[msg.sender] = true;
        emit AccessPurchased(msg.sender, msg.value);
    }

    /// @notice Revoke access for a user
    function revokeAccess(address user) external onlyOwner {
        hasAccess[user] = false;
        emit AccessRevoked(user);
    }

    /// @notice Change the access fee
    function setAccessFee(uint256 newFee) external onlyOwner {
        accessFee = newFee;
        emit AccessFeeChanged(newFee);
    }

    /// @notice Withdraw contract balance to owner
    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    /// @notice Transfer ownership
    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Zero address");
        owner = newOwner;
    }
}
