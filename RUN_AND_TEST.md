# 🚀 How to Run and Test IdentiX

This guide will walk you through running and testing the IdentiX platform step by step.

## 📋 Prerequisites

Before starting, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local MongoDB installation, OR
  - Docker (for easy setup)
- **npm** (comes with Node.js)

### Quick Prerequisites Check

```bash
node --version  # Should be v18+
npm --version   # Should be 8+
mongod --version  # If MongoDB is installed locally
```

---

## 🔧 Step 1: Install Dependencies

From the project root directory:

```bash
npm run install:all
```

This installs dependencies for:
- Root project
- Backend API
- Frontend apps (wallet, issuer, verifier)
- Blockchain contracts

**Expected time:** 2-5 minutes

---

## ⚙️ Step 2: Configure Environment Variables

### 2.1 Backend Configuration

```bash
cd backend
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Linux/Mac
```

Edit `backend/.env` with these values:

```env
PORT=3000
NODE_ENV=development

# MongoDB - use default if running locally
DB_URI=mongodb://localhost:27017/identix

# Blockchain - we'll get these in the next step
BLOCKCHAIN_RPC_URL=http://localhost:8545
PRIVATE_KEY=ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=  # Leave empty for now, we'll fill this after deploying

# JWT Secret - use any random string for development
JWT_SECRET=your-secret-key-change-in-production-12345

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Note:** The `PRIVATE_KEY` above is a default Hardhat account private key (safe for local development only).

---

## 🗄️ Step 3: Start MongoDB

### Option A: Using Docker (Recommended)

```bash
docker run -d -p 27017:27017 --name mongodb mongo
```

### Option B: Local MongoDB Installation

```bash
mongod
```

**Verify MongoDB is running:**
```bash
# Should connect successfully
mongosh mongodb://localhost:27017/identix
```

---

## ⛓️ Step 4: Deploy Smart Contracts (Local Blockchain)

You'll need **2 terminals** for this step.

### Terminal 1: Start Local Blockchain

```bash
cd blockchain
npm run node
```

**Keep this terminal running!** You should see output like:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

### Terminal 2: Deploy Contracts

```bash
cd blockchain
npm run deploy:local
```

**Copy the contract address** from the output. It will look like:
```
✅ CredentialRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Update `backend/.env`:**
```env
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

---

## 🎯 Step 5: Start All Services

You'll need **4 terminals** running simultaneously:

### Terminal 1: Backend API

```bash
npm run dev:backend
```

**Expected output:**
```
✅ MongoDB connected successfully
✅ Veramo agent initialized
🚀 Server running on port 3000
📡 Health check: http://localhost:3000/health
```

**Test it:** Open http://localhost:3000/health in your browser - should return `{"status":"OK"}`

### Terminal 2: Wallet App

```bash
npm run dev:wallet
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3001/
```

### Terminal 3: Issuer App

```bash
npm run dev:issuer
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3002/
```

### Terminal 4: Verifier App

```bash
npm run dev:verifier
```

**Expected output:**
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:3003/
```

---

## ✅ Step 6: Test the Complete Flow

### Test Flow Overview

```
1. Create DID (Wallet) → 2. Issue Credential (Issuer) → 3. View Credential (Wallet) → 4. Verify Credential (Verifier)
```

---

### Test 1: Create a DID (Wallet App)

1. **Open** http://localhost:3001 in your browser
2. **Click** "Create DID" in the navigation
3. **Click** "Create DID" button
4. **Wait** for the DID to be created (2-5 seconds)
5. **Copy** the generated DID (it will look like `did:ethr:0x...`)

**Expected Result:** ✅ DID created successfully, redirected to dashboard

**Save this DID** - you'll need it for the next steps!

---

### Test 2: Issue a Credential (Issuer App)

1. **Open** http://localhost:3002 in your browser
2. **Click** "Issue Credential" in the navigation
3. **Fill in the form:**
   - **Issuer DID:** Use the DID you created in Test 1 (or create a new one)
   - **Holder DID:** Use the same DID from Test 1
   - **Credential Type:** Select "Educational Credential"
   - **Name:** Enter any name (e.g., "John Doe")
   - **Degree:** Enter a degree (e.g., "Bachelor of Science")
   - **Institution:** Enter an institution (e.g., "IIT Gandhinagar")
   - **Date:** Select today's date
4. **Click** "Issue Credential"

**Expected Result:** ✅ Credential issued successfully with credential ID displayed

**Note:** You can use the same DID for both issuer and holder for testing purposes.

---

### Test 3: View Credentials (Wallet App)

1. **Go back to** http://localhost:3001
2. **Click** "Credentials" in the navigation
3. **Verify** you see the credential you just issued

**Expected Result:** ✅ Credential card displayed with details

---

### Test 4: Share Credential via QR Code (Wallet App)

1. **In the Wallet app**, click "Share" on any credential
2. **Verify** a QR code is displayed
3. **Verify** the credential JSON is shown below

**Expected Result:** ✅ QR code and JSON data visible

---

### Test 5: Verify Credential (Verifier App)

#### Option A: Using QR Code Scanner

1. **Open** http://localhost:3003 in your browser
2. **Click** "Verify Credential"
3. **Click** "Start Scanning"
4. **Allow** camera permissions if prompted
5. **Point** camera at the QR code from Test 4
6. **Wait** for automatic scan and verification

**Expected Result:** ✅ "VERIFIED" status with green checkmark

#### Option B: Using JSON Paste

1. **Open** http://localhost:3003
2. **Click** "Verify Credential"
3. **Click** "Paste JSON" tab
4. **Copy** the credential JSON from Wallet app (Test 4)
5. **Paste** into the text area
6. **Click** "Verify Credential"

**Expected Result:** ✅ "VERIFIED" status with green checkmark

---

## 🧪 Additional Testing

### Test Backend API Directly

#### Health Check
```bash
curl http://localhost:3000/health
```
**Expected:** `{"status":"OK","timestamp":"..."}`

#### Create DID via API
```bash
curl -X POST http://localhost:3000/api/did/create \
  -H "Content-Type: application/json" \
  -d '{"method":"ethr"}'
```

#### Verify Credential via API
```bash
curl -X POST http://localhost:3000/api/credentials/verify \
  -H "Content-Type: application/json" \
  -d '{"credential":{...}}'
```

---

## 🐛 Troubleshooting

### Issue: MongoDB Connection Failed

**Symptoms:** Backend shows `❌ MongoDB connection error`

**Solutions:**
1. Check if MongoDB is running: `docker ps` (if using Docker)
2. Verify connection string in `backend/.env`
3. Try: `mongosh mongodb://localhost:27017/identix`

---

### Issue: Blockchain Connection Failed

**Symptoms:** Backend can't connect to blockchain

**Solutions:**
1. Ensure Hardhat node is running (`npm run dev:blockchain`)
2. Check `BLOCKCHAIN_RPC_URL` in `backend/.env` is `http://localhost:8545`
3. Verify contract address is set correctly

---

### Issue: Frontend Can't Connect to Backend

**Symptoms:** Frontend shows network errors or can't load data

**Solutions:**
1. Ensure backend is running on port 3000
2. Check browser console for errors
3. Verify proxy settings in `frontend/*/vite.config.js`

---

### Issue: DID Creation Fails

**Symptoms:** Error when creating DID

**Solutions:**
1. Check backend logs for Veramo errors
2. Ensure MongoDB is connected
3. Check if `veramo-database.sqlite` file exists (created automatically)

---

### Issue: Credential Verification Fails

**Symptoms:** Verification shows "FAILED" even with valid credential

**Solutions:**
1. Check backend logs for verification errors
2. Ensure the credential JSON is complete
3. Verify the issuer DID exists and is valid

---

## 📊 Expected Test Results Summary

| Test | Expected Result | Status |
|------|----------------|--------|
| Backend Health Check | `{"status":"OK"}` | ✅ |
| Create DID | DID generated successfully | ✅ |
| Issue Credential | Credential issued with ID | ✅ |
| View Credentials | Credential appears in wallet | ✅ |
| Generate QR Code | QR code displayed | ✅ |
| Verify Credential | "VERIFIED" status | ✅ |

---

## 🎉 Success Criteria

You've successfully tested IdentiX if:

- ✅ All 4 terminals are running without errors
- ✅ You can create a DID in the Wallet app
- ✅ You can issue a credential in the Issuer app
- ✅ You can view credentials in the Wallet app
- ✅ You can generate a QR code for a credential
- ✅ You can verify a credential in the Verifier app

---

## 🚀 Next Steps

Once basic testing is complete:

1. **Test Revocation:** Issue a credential, then revoke it, then verify it shows as revoked
2. **Test Multiple Credentials:** Issue multiple credentials to the same holder
3. **Test Different Credential Types:** Try different credential types (Educational, Professional, etc.)
4. **Test Error Cases:** Try invalid DIDs, malformed credentials, etc.

---

## 📝 Quick Reference

### Application URLs
- Backend API: http://localhost:3000
- Wallet: http://localhost:3001
- Issuer: http://localhost:3002
- Verifier: http://localhost:3003

### Key Commands
```bash
# Install all dependencies
npm run install:all

# Start services (run in separate terminals)
npm run dev:backend
npm run dev:wallet
npm run dev:issuer
npm run dev:verifier
npm run dev:blockchain

# Run tests
npm run test:backend
npm run test:blockchain
```

---

**Happy Testing! 🎊**
