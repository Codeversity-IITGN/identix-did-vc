# Identix - DID & Verifiable Credentials System

A decentralized identity and verifiable credentials system built on blockchain technology, enabling secure issuance, storage, and verification of digital credentials.

## 🌟 Features

- **Decentralized Identifiers (DIDs)**: Create and manage W3C compliant DIDs
- **Verifiable Credentials**: Issue and verify tamper-proof digital credentials
- **Blockchain Anchoring**: Immutable credential anchoring on Ethereum
- **Revocation Registry**: On-chain credential revocation management
- **Standards Compliant**: W3C DID and VC specifications

## 📁 Project Structure

```
identix-did-vc/
├── backend/              # Express.js backend API
│   ├── src/
│   │   ├── config/       # Configuration files
│   │   ├── routes/       # API routes
│   │   ├── controllers/  # Request handlers
│   │   ├── services/     # Business logic
│   │   ├── crypto/       # Cryptographic utilities
│   │   ├── middleware/   # Express middleware
│   │   ├── models/       # Database models
│   │   └── tests/        # Test files
│   └── package.json
│
├── blockchain/           # Smart contracts
│   ├── contracts/        # Solidity contracts
│   ├── scripts/          # Deployment scripts
│   └── hardhat.config.js
│
├── frontend/             # Frontend applications
│   ├── issuer/           # Issuer application
│   ├── verifier/         # Verifier application
│   └── wallet/           # Wallet application
│
└── docs/                 # Documentation
    ├── architecture.md   # System architecture
    ├── api-spec.md       # API specification
    └── demo-flow.md      # Demo walkthrough
```

## 🚀 Quick Start

### Prerequisites

- Node.js v16+
- MongoDB
- Ethereum node (Hardhat for local development)

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev
```

### 2. Blockchain Setup

```bash
cd blockchain
npm install

# Start local blockchain
npx hardhat node

# Deploy contracts (in another terminal)
npx hardhat run scripts/deploy.js --network localhost
```

### 3. Frontend Setup

```bash
cd frontend/wallet
npm install
npm run dev
```

## 📚 Documentation

- [Architecture](docs/architecture.md) - System design and components
- [API Specification](docs/api-spec.md) - Complete API reference
- [Demo Flow](docs/demo-flow.md) - Step-by-step demo guide

## 🔑 Key Components

### Backend
- **Framework**: Express.js
- **DID/VC Library**: Veramo
- **Database**: MongoDB
- **Blockchain**: ethers.js

### Blockchain
- **Platform**: Ethereum
- **Development**: Hardhat
- **Language**: Solidity 0.8.19

### Smart Contracts
- **CredentialRegistry**: Manages credential anchoring and revocation

## 🔐 Security Features

- JWT-based authentication
- Role-based access control
- Rate limiting
- Encrypted key storage
- On-chain credential anchoring
- Revocation registry

## 📖 API Endpoints

### DID Management
- `POST /api/did/create` - Create DID
- `GET /api/did/:did` - Resolve DID
- `PUT /api/did/:did` - Update DID
- `DELETE /api/did/:did` - Delete DID

### Credentials
- `POST /api/credentials/issue` - Issue credential
- `POST /api/credentials/verify` - Verify credential
- `POST /api/credentials/revoke` - Revoke credential
- `GET /api/credentials/:id` - Get credential
- `GET /api/credentials/holder/:did` - Get holder's credentials

### Blockchain
- `POST /api/blockchain/anchor` - Anchor credential
- `GET /api/blockchain/verify/:hash` - Verify on-chain
- `GET /api/blockchain/status/:id` - Check revocation status

## 🧪 Testing

### Backend Tests
```bash
cd backend
npm test
```

### Smart Contract Tests
```bash
cd blockchain
npx hardhat test
```

## 🛠️ Development

### Compile Smart Contracts
```bash
cd blockchain
npx hardhat compile
```

### Run Local Blockchain
```bash
npx hardhat node
```

### Deploy Contracts
```bash
npx hardhat run scripts/deploy.js --network localhost
```

## 📝 Standards Compliance

- [W3C Decentralized Identifiers (DIDs) v1.0](https://www.w3.org/TR/did-core/)
- [W3C Verifiable Credentials Data Model v1.1](https://www.w3.org/TR/vc-data-model/)
- DID Methods: `did:ethr`, `did:key`
- Proof Formats: JWT, JSON-LD

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Veramo Documentation](https://veramo.io/)
- [W3C DID Specification](https://www.w3.org/TR/did-core/)
- [W3C VC Specification](https://www.w3.org/TR/vc-data-model/)
- [Ethereum Documentation](https://ethereum.org/en/developers/docs/)

## 👥 Authors

Your Name / Team Name

## 📧 Contact

For questions and support, please open an issue or contact [your-email@example.com]
