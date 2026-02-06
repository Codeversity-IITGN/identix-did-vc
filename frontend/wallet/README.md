# IdentiX Wallet - User Application

The wallet application for users to create their decentralized identity, receive credentials, and share them via QR codes.

## Features

- **Welcome Page**: Choose to create a new wallet or recover an existing one
- **Create Wallet**: Generate a new DID and display seed phrase for backup
- **Recover Wallet**: Restore wallet using 12-word seed phrase
- **Credentials List**: View all credentials issued to your DID
- **Credential Detail**: View full credential details and share via QR code

## Setup

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3001`

## Usage Flow

1. **Create Wallet**: Click "Create New Wallet" → Save seed phrase → Continue
2. **Receive Credentials**: Share your DID with issuers
3. **View Credentials**: Navigate to Credentials page to see all your credentials
4. **Share Credential**: Click on a credential → Click "Share via QR Code" → Show QR to verifier

## API Integration

The app calls these backend endpoints:
- `POST /api/did/create` - Create new DID
- `POST /api/did/recover` - Recover DID from seed phrase (needs backend implementation)
- `GET /api/credentials/holder/:did` - Get credentials for a holder
- `GET /api/credentials/:credentialId` - Get specific credential

## Notes

- Seed phrase is stored in localStorage (for demo purposes)
- In production, seed phrase should be encrypted and stored securely
- Backend `/api/did/recover` endpoint needs to be implemented
