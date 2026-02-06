# Identix Backend

Backend service for the Identix DID and Verifiable Credentials system.

## Features

- **DID Management**: Create, resolve, update, and delete DIDs
- **Credential Issuance**: Issue W3C compliant verifiable credentials
- **Credential Verification**: Verify credentials and presentations
- **Revocation**: Revoke credentials with on-chain anchoring
- **Blockchain Integration**: Anchor credentials to blockchain for immutability

## Tech Stack

- **Framework**: Express.js
- **DID/VC Library**: Veramo
- **Database**: MongoDB
- **Blockchain**: Ethereum (via ethers.js)

## Getting Started

### Prerequisites

- Node.js v16+
- MongoDB
- Ethereum node (local or remote)

### Installation

```bash
npm install
```

### Configuration

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

### Testing

```bash
npm test
```

## API Endpoints

### DID Routes
- `POST /api/did/create` - Create a new DID
- `GET /api/did/:did` - Resolve a DID
- `PUT /api/did/:did` - Update a DID
- `DELETE /api/did/:did` - Delete a DID

### Credential Routes
- `POST /api/credentials/issue` - Issue a credential
- `POST /api/credentials/verify` - Verify a credential
- `POST /api/credentials/revoke` - Revoke a credential
- `GET /api/credentials/:credentialId` - Get a credential
- `GET /api/credentials/holder/:did` - Get credentials by holder

### Blockchain Routes
- `POST /api/blockchain/anchor` - Anchor credential to blockchain
- `GET /api/blockchain/verify/:hash` - Verify on-chain
- `GET /api/blockchain/status/:credentialId` - Get revocation status

## Project Structure

```
backend/
├── src/
│   ├── app.js              # Express app setup
│   ├── server.js           # Server entry point
│   ├── config/             # Configuration files
│   ├── routes/             # API routes
│   ├── controllers/        # Request handlers
│   ├── services/           # Business logic
│   ├── crypto/             # Cryptographic utilities
│   ├── middleware/         # Express middleware
│   ├── models/             # Database models
│   └── tests/              # Test files
├── .env.example            # Environment variables template
└── package.json            # Dependencies
```

## License

MIT
