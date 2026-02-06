# Demo Mode Guide - Frontend Apps Work Without Backend

All three frontend apps now support **Demo Mode** which allows you to see and interact with the UI even when the backend is not running!

## 🎯 Quick Start - Demo Mode

### Wallet App (http://localhost:3001)

1. **Open the app** → You'll see the Welcome page
2. **Click "Try Demo Mode"** button (green button at bottom)
3. **Instantly see:**
   - Pre-loaded DID
   - 2 demo credentials
   - Full UI functionality

**What works in Demo Mode:**
- ✅ View credentials list
- ✅ View credential details
- ✅ Generate QR codes
- ✅ Share credentials
- ✅ All UI interactions

### Verifier App (http://localhost:3003)

1. **Open the app** → You'll see the Landing page
2. **Click "Try Demo Verification"** button (blue button)
3. **Instantly see:**
   - Demo verification result (VERIFIED ✅)
   - Credential details
   - Full verification UI

**What works in Demo Mode:**
- ✅ View verification results
- ✅ See credential details
- ✅ QR scanning (camera still works)
- ✅ Paste JSON verification (uses demo data if backend unavailable)

### Issuer App (http://localhost:3002)

1. **Open the app** → You'll see the Login page
2. **Click "Try Demo Mode"** button (blue button at bottom)
3. **Instantly see:**
   - Pre-loaded issuer account
   - Issue credential form
   - Demo issued credentials list

**What works in Demo Mode:**
- ✅ Issue credentials (creates demo credentials)
- ✅ View issued credentials (shows 2 demo credentials)
- ✅ Revoke credentials (demo revocation)
- ✅ All UI interactions

## 🚀 Running the Apps

### Start All Three Apps

```powershell
# Terminal 1 - Wallet
cd frontend\wallet
npm run dev

# Terminal 2 - Verifier  
cd frontend\verifier
npm run dev

# Terminal 3 - Issuer
cd frontend\issuer
npm run dev
```

### Access the Apps

- **Wallet**: http://localhost:3001
- **Verifier**: http://localhost:3003
- **Issuer**: http://localhost:3002

## 📊 Demo Data Included

### Wallet Demo Data
- **DID**: `did:ethr:0x1234567890123456789012345678901234567890`
- **Seed Phrase**: `abandon ability able about above absent absorb abstract absurd abuse access accident`
- **2 Demo Credentials**:
  1. Educational Credential (Bachelor of Science from IIT Gandhinagar)
  2. Professional Credential (Software Engineer at Tech Corp)

### Verifier Demo Data
- **Demo Verification Result**: Always shows VERIFIED ✅
- **Demo Credential**: Educational Credential with full details

### Issuer Demo Data
- **Issuer DID**: `did:ethr:0x9876543210987654321098765432109876543210`
- **Wallet Address**: `0x9876543210987654321098765432109876543210`
- **2 Demo Issued Credentials**: Pre-populated list

## 🔄 How Demo Mode Works

1. **Automatic Fallback**: If backend is unavailable, apps automatically use demo data
2. **Manual Activation**: Click "Try Demo Mode" buttons to instantly enable
3. **Seamless Experience**: UI works exactly the same, just uses demo data instead of API calls
4. **No Backend Required**: Everything works offline!

## 🎨 Features Available in Demo Mode

### Wallet App
- ✅ View welcome page
- ✅ Create wallet (uses demo DID when backend unavailable)
- ✅ View credentials list (shows 2 demo credentials)
- ✅ View credential details
- ✅ Generate QR codes
- ✅ Share credentials

### Verifier App
- ✅ View landing page
- ✅ Scan QR codes (camera works)
- ✅ Paste JSON (uses demo verification if backend unavailable)
- ✅ View verification results (always shows VERIFIED in demo mode)

### Issuer App
- ✅ View login page
- ✅ Issue credentials (creates demo credentials)
- ✅ View issued credentials (shows demo list)
- ✅ Revoke credentials (demo revocation)

## 💡 Tips

1. **Demo Mode Persists**: Once enabled, demo mode stays active until you clear localStorage
2. **Mix with Backend**: If backend is running, apps will try backend first, then fall back to demo
3. **Perfect for Demos**: Great for presentations without needing full backend setup
4. **Development**: Useful for frontend development without backend dependency

## 🧹 Clearing Demo Mode

To exit demo mode and use real backend:

```javascript
// In browser console:
localStorage.removeItem('identix_demo_mode')
localStorage.removeItem('identix_did')
localStorage.removeItem('identix_seed_phrase')
localStorage.removeItem('identix_issuer_demo_mode')
localStorage.removeItem('identix_issuer_account')
```

Then refresh the page.

## ✅ Success Indicators

You'll know demo mode is working when:
- ✅ Pages load instantly
- ✅ No "Backend unavailable" errors
- ✅ Data appears immediately
- ✅ All buttons and interactions work
- ✅ QR codes generate successfully

Enjoy exploring the IdentiX platform in Demo Mode! 🎉
