# IdentiX Issuer - Credential Issuance Application

The issuer application for trusted entities to issue and revoke verifiable credentials.

## Features

- **Login Page**: Connect MetaMask wallet
- **Issue Credential**: Create and issue verifiable credentials
- **Issued Credentials**: View all credentials you've issued
- **Revoke Credential**: Revoke previously issued credentials

## Prerequisites

- **MetaMask Extension**: Must be installed in browser
- **Authorized Wallet**: Your wallet address must be authorized by backend

## Setup

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3002`

## Usage Flow

1. **Connect Wallet**: 
   - Open app → Click "Connect MetaMask"
   - Approve connection in MetaMask
   - Wallet address is auto-converted to DID format
2. **Issue Credential**:
   - Navigate to "Issue Credential"
   - Enter holder DID
   - Fill credential details
   - Click "Issue Credential"
3. **View Credentials**: Navigate to "Issued Credentials" to see all issued credentials
4. **Revoke Credential**: Navigate to "Revoke" → Enter credential ID → Revoke

## API Integration

The app calls these backend endpoints:
- `POST /api/credentials/issue` - Issue a new credential
- `POST /api/credentials/revoke` - Revoke a credential
- `GET /api/credentials/issuer/:issuerDID` - Get credentials by issuer (needs backend implementation)

## Dependencies

- `ethers` - For MetaMask integration
- MetaMask browser extension

## Notes

- Issuer DID is auto-generated from connected wallet address: `did:ethr:{walletAddress}`
- Backend validates that the wallet address is authorized to issue credentials
- Backend endpoint for fetching issuer credentials needs to be implemented

## MetaMask Integration

The app uses ethers.js to connect to MetaMask:
- Automatically detects MetaMask
- Requests account access
- Listens for account changes
- Converts wallet address to DID format
