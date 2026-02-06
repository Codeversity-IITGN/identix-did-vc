# API Specification

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <token>
```

## DID Endpoints

### Create DID

**POST** `/did/create`

Create a new Decentralized Identifier.

**Request Body:**
```json
{
  "method": "ethr",
  "options": {}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "did": "did:ethr:0x...",
    "keys": [...],
    "services": []
  }
}
```

### Resolve DID

**GET** `/did/:did`

Resolve a DID to its DID Document.

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": "did:ethr:0x...",
    "verificationMethod": [...],
    "authentication": [...]
  }
}
```

### Update DID

**PUT** `/did/:did`

Update a DID document.

**Request Body:**
```json
{
  "updates": {
    "service": [...]
  }
}
```

### Delete DID

**DELETE** `/did/:did`

Delete a DID.

**Response:**
```json
{
  "success": true,
  "message": "DID deleted successfully"
}
```

## Credential Endpoints

### Issue Credential

**POST** `/credentials/issue`

Issue a new verifiable credential.

**Request Body:**
```json
{
  "issuerDID": "did:ethr:0x...",
  "holderDID": "did:ethr:0x...",
  "type": "UniversityDegree",
  "credentialSubject": {
    "degree": "Bachelor of Science",
    "university": "Example University"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "@context": ["https://www.w3.org/2018/credentials/v1"],
    "type": ["VerifiableCredential", "UniversityDegree"],
    "issuer": "did:ethr:0x...",
    "issuanceDate": "2024-01-01T00:00:00Z",
    "credentialSubject": {...},
    "proof": {...}
  }
}
```

### Verify Credential

**POST** `/credentials/verify`

Verify a verifiable credential.

**Request Body:**
```json
{
  "credential": {
    "@context": [...],
    "type": [...],
    "issuer": "did:ethr:0x...",
    "credentialSubject": {...},
    "proof": {...}
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "verified": true,
    "issuer": "did:ethr:0x...",
    "subject": {...},
    "issuanceDate": "2024-01-01T00:00:00Z",
    "errors": []
  }
}
```

### Revoke Credential

**POST** `/credentials/revoke`

Revoke a credential.

**Request Body:**
```json
{
  "credentialId": "credential-id",
  "reason": "Credential no longer valid"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "credential-id",
    "status": "revoked",
    "reason": "Credential no longer valid",
    "revokedAt": "2024-01-01T00:00:00Z"
  }
}
```

### Get Credential

**GET** `/credentials/:credentialId`

Get a credential by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "credential-id",
    "issuer": "did:ethr:0x...",
    "holder": "did:ethr:0x...",
    "credential": {...},
    "status": "active"
  }
}
```

### Get Credentials by Holder

**GET** `/credentials/holder/:did`

Get all credentials for a holder.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "credentialId": "credential-id-1",
      "type": "UniversityDegree",
      "issuer": "did:ethr:0x...",
      "status": "active"
    },
    ...
  ]
}
```

## Blockchain Endpoints

### Anchor Credential

**POST** `/blockchain/anchor`

Anchor a credential hash to the blockchain.

**Request Body:**
```json
{
  "credential": {...}
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "0x...",
    "transactionHash": "0x...",
    "blockNumber": 12345
  }
}
```

### Verify On-Chain

**GET** `/blockchain/verify/:hash`

Verify if a credential hash is anchored on-chain.

**Response:**
```json
{
  "success": true,
  "data": {
    "hash": "0x...",
    "isAnchored": true
  }
}
```

### Get Revocation Status

**GET** `/blockchain/status/:credentialId`

Check the revocation status on-chain.

**Response:**
```json
{
  "success": true,
  "data": {
    "credentialId": "credential-id",
    "isRevoked": false
  }
}
```

## Error Responses

All endpoints may return error responses in the following format:

```json
{
  "error": {
    "message": "Error description",
    "status": 400,
    "details": [...]
  }
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Rate Limiting

- Default: 100 requests per 15 minutes
- Strict endpoints: 10 requests per 15 minutes

Rate limit headers:
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 99
X-RateLimit-Reset: 1640000000
```
