# Demo Flow

This document describes the end-to-end flow for demonstrating the Identix DID and Verifiable Credentials system.

## Prerequisites

1. Backend server running
2. MongoDB running
3. Local blockchain node running (Hardhat)
4. Smart contract deployed

## Demo Scenario: University Degree Credential

### Actors

1. **University** (Issuer) - Issues degree credentials
2. **Student** (Holder) - Receives and holds credentials
3. **Employer** (Verifier) - Verifies credentials

## Step-by-Step Flow

### 1. Setup: Create DIDs

#### Create University DID

```bash
curl -X POST http://localhost:3000/api/did/create \
  -H "Content-Type: application/json" \
  -d '{
    "method": "ethr"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "did": "did:ethr:0xUniversity123...",
    "keys": [...]
  }
}
```

Save the University DID: `did:ethr:0xUniversity123...`

#### Create Student DID

```bash
curl -X POST http://localhost:3000/api/did/create \
  -H "Content-Type: application/json" \
  -d '{
    "method": "ethr"
  }'
```

Save the Student DID: `did:ethr:0xStudent456...`

### 2. Issue Credential

University issues a degree credential to the student.

```bash
curl -X POST http://localhost:3000/api/credentials/issue \
  -H "Content-Type: application/json" \
  -d '{
    "issuerDID": "did:ethr:0xUniversity123...",
    "holderDID": "did:ethr:0xStudent456...",
    "type": "UniversityDegree",
    "credentialSubject": {
      "degree": "Bachelor of Science in Computer Science",
      "university": "Example University",
      "graduationDate": "2024-05-15",
      "gpa": "3.8"
    }
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "UniversityDegree"],
    "issuer": "did:ethr:0xUniversity123...",
    "issuanceDate": "2024-01-01T00:00:00Z",
    "credentialSubject": {
      "id": "did:ethr:0xStudent456...",
      "degree": "Bachelor of Science in Computer Science",
      "university": "Example University",
      "graduationDate": "2024-05-15",
      "gpa": "3.8"
    },
    "proof": {
      "type": "JwtProof2020",
      "jwt": "eyJ..."
    }
  }
}
```

Save the credential for the next steps.

### 3. Anchor Credential to Blockchain

```bash
curl -X POST http://localhost:3000/api/blockchain/anchor \
  -H "Content-Type: application/json" \
  -d '{
    "credential": <saved-credential>
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "0xabc123...",
    "transactionHash": "0xtx123...",
    "blockNumber": 12345
  }
}
```

### 4. Student Retrieves Credentials

```bash
curl -X GET http://localhost:3000/api/credentials/holder/did:ethr:0xStudent456...
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "credentialId": "credential-id-1",
      "type": "UniversityDegree",
      "issuer": "did:ethr:0xUniversity123...",
      "status": "active",
      "credential": {...}
    }
  ]
}
```

### 5. Verify Credential (Employer)

Employer verifies the student's credential.

```bash
curl -X POST http://localhost:3000/api/credentials/verify \
  -H "Content-Type: application/json" \
  -d '{
    "credential": <saved-credential>
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "issuer": "did:ethr:0xUniversity123...",
    "subject": {
      "id": "did:ethr:0xStudent456...",
      "degree": "Bachelor of Science in Computer Science",
      "university": "Example University"
    },
    "issuanceDate": "2024-01-01T00:00:00Z",
    "errors": []
  }
}
```

### 6. Verify On-Chain

```bash
curl -X GET http://localhost:3000/api/blockchain/verify/0xabc123...
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "0xabc123...",
    "isAnchored": true
  }
}
```

### 7. Revoke Credential (Optional)

If the university needs to revoke the credential:

```bash
curl -X POST http://localhost:3000/api/credentials/revoke \
  -H "Content-Type: application/json" \
  -d '{
    "credentialId": "credential-id-1",
    "reason": "Degree revoked due to academic misconduct"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "credential-id-1",
    "status": "revoked",
    "reason": "Degree revoked due to academic misconduct",
    "revokedAt": "2024-01-15T00:00:00Z"
  }
}
```

### 8. Check Revocation Status

```bash
curl -X GET http://localhost:3000/api/blockchain/status/credential-id-1
```

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "credential-id-1",
    "isRevoked": true
  }
}
```

## Visual Flow Diagram

```
┌──────────────┐
│  University  │
│   (Issuer)   │
└──────┬───────┘
       │
       │ 1. Create DID
       ▼
┌──────────────┐
│   Backend    │
│   + Veramo   │
└──────┬───────┘
       │
       │ 2. Issue Credential
       ▼
┌──────────────┐      ┌──────────────┐
│   Student    │◄─────│   Backend    │
│   (Holder)   │      │              │
└──────┬───────┘      └──────┬───────┘
       │                     │
       │                     │ 3. Anchor to Blockchain
       │                     ▼
       │              ┌──────────────┐
       │              │  Blockchain  │
       │              └──────────────┘
       │
       │ 4. Present Credential
       ▼
┌──────────────┐
│   Employer   │
│  (Verifier)  │
└──────┬───────┘
       │
       │ 5. Verify Credential
       ▼
┌──────────────┐
│   Backend    │
│   + Veramo   │
│   + Chain    │
└──────────────┘
```

## Expected Outcomes

1. ✅ DIDs created successfully
2. ✅ Credential issued and signed
3. ✅ Credential anchored to blockchain
4. ✅ Credential verified successfully
5. ✅ On-chain verification confirms anchoring
6. ✅ Revocation works (if tested)

## Troubleshooting

### Common Issues

1. **MongoDB not connected**: Ensure MongoDB is running
2. **Blockchain connection failed**: Check if Hardhat node is running
3. **Contract not deployed**: Run deployment script first
4. **Verification failed**: Check if credential is properly signed

### Logs

Check backend logs for detailed error messages:
```bash
npm run dev
```

## Next Steps

1. Build frontend applications
2. Implement wallet functionality
3. Add more credential types
4. Implement selective disclosure
5. Add biometric authentication
