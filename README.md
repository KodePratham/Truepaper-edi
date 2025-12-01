# TruePaper 📜

Blockchain-based certificate verification system built on **BSC Testnet** with PDF storage on **IPFS via Pinata**.

## Features

- ✅ Issue certificates with person's name and PDF document
- ✅ Store PDF files on IPFS (up to 100MB)
- ✅ Verify certificates using certificate ID
- ✅ **Public Registry**: List all issued certificates
- ✅ Revoke certificates (issuer/owner only)
- ✅ Multi-issuer support with authorization

## Tech Stack

- **Blockchain**: BSC Testnet (Chain ID: 97)
- **Smart Contract**: Solidity 0.8.19
- **Frontend**: Next.js 14 + React 18
- **Storage**: Pinata IPFS
- **Web3**: ethers.js v6

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file with your keys:

```env
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_KEY=your_pinata_secret_key
```

### 3. Get Test BNB

Get testnet BNB from: https://testnet.bnbchain.org/faucet-smart

### 4. Deploy Contract

```bash
npm run compile
npm run deploy
```

> **Note:** If you modify the contract (e.g., adding the registry feature), you must redeploy it. The new logic will only apply to the new contract address.

### 5. Verify Contract on BSCScan

After deployment, verify using Etherscan API V2 (single key works for all chains):

```bash
npx hardhat verify --network bscTestnet YOUR_CONTRACT_ADDRESS
```

### 6. Update Frontend Config

Add deployed contract address to `.env.local`:

```env
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedAddress
```

### 7. Run Frontend

```bash
npm run dev
```

Open http://localhost:3000

## Contract Verification with Etherscan API V2

Etherscan API V2 uses a unified API key system. Your Etherscan API key works for:
- Ethereum
- BSC (BNB Smart Chain)
- Polygon
- Base
- Arbitrum
- 60+ supported chains

See: https://docs.etherscan.io/v2-migration

## Smart Contract Functions

| Function | Description |
|----------|-------------|
| `issueCertificate(name, ipfsHash)` | Issue a new certificate |
| `verifyCertificate(id)` | Verify certificate details |
| `revokeCertificate(id)` | Revoke a certificate |
| `authorizeIssuer(address)` | Add authorized issuer |
| `revokeIssuer(address)` | Remove issuer authorization |

## API Keys Setup

### Etherscan API Key
1. Go to https://etherscan.io/register
2. Create account and verify email
3. Navigate to https://etherscan.io/myapikey
4. Create new API key (works for BSC and all chains)

### Pinata API Keys
1. Go to https://app.pinata.cloud/
2. Create account
3. Navigate to API Keys section
4. Generate new key with `pinFileToIPFS` permission

## Project Structure
