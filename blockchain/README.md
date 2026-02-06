# Blockchain Smart Contracts

This directory contains the smart contracts for the Identix DID and Verifiable Credentials system.

## Contracts

### CredentialRegistry.sol

Main contract for anchoring and managing verifiable credentials on-chain.

**Features:**
- Anchor credential hashes to blockchain
- Verify credential existence
- Revoke credentials
- Manage authorized issuers

## Setup

### Prerequisites

- Node.js v16+
- Hardhat

### Installation

```bash
npm install
```

### Configuration

Create a `.env` file with:

```
PRIVATE_KEY=your-private-key
SEPOLIA_RPC_URL=your-sepolia-rpc-url
MAINNET_RPC_URL=your-mainnet-rpc-url
ETHERSCAN_API_KEY=your-etherscan-api-key
```

## Development

### Compile Contracts

```bash
npx hardhat compile
```

### Run Tests

```bash
npx hardhat test
```

### Deploy to Local Network

Start local node:
```bash
npx hardhat node
```

Deploy:
```bash
npx hardhat run scripts/deploy.js --network localhost
```

### Deploy to Testnet

```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### Deploy to Mainnet

```bash
npx hardhat run scripts/deploy.js --network mainnet
```

## Contract Functions

### Owner Functions
- `authorizeIssuer(address)` - Authorize an issuer
- `revokeIssuerAuthorization(address)` - Revoke issuer authorization

### Issuer Functions
- `anchorCredential(bytes32)` - Anchor a credential hash
- `revokeCredential(bytes32)` - Revoke a credential

### Public View Functions
- `verifyCredential(bytes32)` - Check if credential is valid
- `isRevoked(bytes32)` - Check if credential is revoked
- `getCredential(bytes32)` - Get credential details

## License

MIT
