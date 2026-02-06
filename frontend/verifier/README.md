# IdentiX Verifier - Verification Application

The verifier application for verifying the authenticity of verifiable credentials.

## Features

- **Landing Page**: Overview of verification capabilities
- **QR Scan Page**: Scan QR code or paste credential JSON
- **Verification Result**: Display verification status (VERIFIED/INVALID/REVOKED)

## Setup

```bash
npm install
```

## Run Development Server

```bash
npm run dev
```

The app will run on `http://localhost:3003`

## Usage Flow

1. **Start Verification**: Click "Verify Credential" on landing page
2. **Scan QR Code**: 
   - Click "Start Scanning"
   - Allow camera permissions
   - Point camera at QR code
   - Automatic verification on scan
3. **OR Paste JSON**:
   - Click "Paste JSON" tab
   - Paste credential JSON
   - Click "Verify Credential"
4. **View Result**: See verification status and credential details

## API Integration

The app calls these backend endpoints:
- `POST /api/credentials/verify` - Verify a credential

## Dependencies

- `html5-qrcode` - For QR code scanning
- Requires camera permissions in browser

## Notes

- Camera access is required for QR scanning
- If camera is unavailable, use the paste JSON method
- Verification results are displayed immediately
