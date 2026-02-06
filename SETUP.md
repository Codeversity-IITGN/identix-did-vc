# IdentiX Setup Guide

This guide will help you set up and run the IdentiX platform locally.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or connection string)
- npm or yarn

## Quick Start

### 1. Install Dependencies

```bash
npm run install:all
```

This will install dependencies for:
- Root project
- Backend
- Frontend applications (wallet, issuer, verifier)
- Blockchain contracts

### 2. Set Up Environment Variables

#### Backend (.env)

Copy `backend/.env.example` to `backend/.env` and configure:

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env`:
```env
PORT=3000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/identix
BLOCKCHAIN_RPC_URL=http://localhost:8545
PRIVATE_KEY=your-private-key-here
CONTRACT_ADDRESS=your-contract-address-here
JWT_SECRET=your-secret-key-change-in-production
```

#### Blockchain (.env)

Create `blockchain/.env`:
```env
SEPOLIA_RPC_URL=your-sepolia-rpc-url
PRIVATE_KEY=your-private-key
ETHERSCAN_API_KEY=your-etherscan-api-key
```

### 3. Start MongoDB

Make sure MongoDB is running:
```bash
# Using Docker
docker run -d -p 27017:27017 mongo

# Or using local installation
mongod
```

### 4. Deploy Smart Contracts (Local)

```bash
# Terminal 1: Start local blockchain
cd blockchain
npm run node

# Terminal 2: Deploy contracts
npm run deploy:local
```

Copy the contract address to `backend/.env` as `CONTRACT_ADDRESS`.

### 5. Start Backend

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:3000`

### 6. Start Frontend Applications

Open separate terminals for each frontend app:

```bash
# Terminal 1: Wallet (port 3001)
cd frontend/wallet
npm run dev

# Terminal 2: Issuer (port 3002)
cd frontend/issuer
npm run dev

# Terminal 3: Verifier (port 3003)
cd frontend/verifier
npm run dev
```

## Application URLs

- **Backend API**: http://localhost:3000
- **Wallet App**: http://localhost:3001
- **Issuer App**: http://localhost:3002
- **Verifier App**: http://localhost:3003

## Development Workflow

### End-to-End Flow

1. **Create DID** (Wallet App)
   - Open http://localhost:3001
   - Navigate to "Create DID"
   - Copy the generated DID

2. **Issue Credential** (Issuer App)
   - Open http://localhost:3002
   - Enter issuer DID and holder DID
   - Fill in credential details
   - Issue credential

3. **Verify Credential** (Verifier App)
   - Open http://localhost:3003
   - Scan QR code or paste credential JSON
   - View verification result

## Testing

### Backend Tests
```bash
cd backend
npm test
```

### Blockchain Tests
```bash
cd blockchain
npm test
```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check `DB_URI` in backend `.env`

### Blockchain Connection Issues
- Ensure Hardhat node is running for local development
- Check `BLOCKCHAIN_RPC_URL` in backend `.env`
- Verify contract address is correct

### Frontend Proxy Issues
- Ensure backend is running on port 3000
- Check Vite proxy configuration in each frontend app

## Production Deployment

### Build Frontend
```bash
npm run build:frontend
```

### Deploy Contracts
```bash
cd blockchain
npm run deploy:sepolia  # or your target network
```

### Environment Variables
Update all `.env` files with production values.

## Architecture

- **Backend**: Express.js API with Veramo for DID/VC management
- **Blockchain**: Solidity smart contracts for credential anchoring
- **Frontend**: React + Vite + TailwindCSS applications

For detailed architecture, see `docs/architecture.md`.
