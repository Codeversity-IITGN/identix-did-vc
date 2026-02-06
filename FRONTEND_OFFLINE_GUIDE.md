# Frontend UI - Offline/Demo Mode Guide

## Can I View the UI Without Backend?

**Yes!** You can view and navigate through most of the UI without the backend running. However, functionality that requires API calls will not work.

## What Works Without Backend

### ✅ Fully Functional (No Backend Required)

1. **Wallet App - Welcome Page**
   - All UI elements visible
   - Navigation works
   - No API calls

2. **Verifier App - Landing Page**
   - All UI elements visible
   - Navigation works
   - No API calls

3. **Issuer App - Login Page**
   - MetaMask connection works (no backend needed)
   - UI displays correctly
   - No API calls

### ⚠️ Partially Functional (UI Works, Actions Fail)

1. **Wallet App**
   - ✅ Create Wallet page UI loads
   - ❌ Creating wallet fails (needs `POST /api/did/create`)
   - ✅ Credentials List UI loads
   - ❌ Loading credentials fails (shows empty state)
   - ✅ Credential Detail UI loads
   - ❌ Fetching credential fails

2. **Verifier App**
   - ✅ QR Scan page UI loads
   - ✅ QR scanning works (camera)
   - ❌ Verification fails (needs `POST /api/credentials/verify`)
   - ✅ Paste JSON works
   - ❌ Verification fails

3. **Issuer App**
   - ✅ Issue Credential form loads
   - ❌ Issuing fails (needs `POST /api/credentials/issue`)
   - ✅ Issued Credentials page loads
   - ❌ Loading credentials fails (shows empty state)
   - ✅ Revoke page loads
   - ❌ Revoking fails (needs `POST /api/credentials/revoke`)

## Running Frontend Without Backend

### Quick Start

```bash
# Terminal 1 - Wallet
cd frontend/wallet
npm install
npm run dev
# Opens on http://localhost:3001

# Terminal 2 - Verifier
cd frontend/verifier
npm install
npm run dev
# Opens on http://localhost:3003

# Terminal 3 - Issuer
cd frontend/issuer
npm install
npm run dev
# Opens on http://localhost:3002
```

### What You'll See

- **All static pages render correctly**
- **Navigation works**
- **Forms and inputs work**
- **Error messages appear when API calls fail**
- **Empty states display when data can't be loaded**

### Expected Behavior

When backend is offline:
- API calls will timeout or show connection errors
- Error messages will appear: "Backend is not available" or "Network Error"
- Pages that require data will show empty states
- Forms will submit but fail with error messages

## For Demo/Presentation Purposes

If you want to demo the UI without backend:

1. **Show Static Pages**: Welcome, Landing, Login pages work perfectly
2. **Show Forms**: All form UIs render correctly
3. **Show Navigation**: All routing works
4. **Show Empty States**: Credentials list shows "No Credentials" message
5. **Show Error Handling**: Error messages display when actions fail

## Making It More Demo-Friendly

To make the UI more demo-friendly without backend, you could:

1. **Add Mock Data**: Create mock credentials/data for display
2. **Add Demo Mode**: Toggle that uses mock data instead of API calls
3. **Better Error Messages**: Show friendly messages instead of technical errors
4. **Offline Indicators**: Show a banner when backend is offline

## Summary

| App | Can View UI? | Can Navigate? | Can Use Features? |
|-----|--------------|---------------|------------------|
| Wallet | ✅ Yes | ✅ Yes | ❌ No (needs backend) |
| Verifier | ✅ Yes | ✅ Yes | ⚠️ Partial (scan works, verify fails) |
| Issuer | ✅ Yes | ✅ Yes | ⚠️ Partial (MetaMask works, issue fails) |

**Bottom Line**: You can definitely view and navigate the UI without backend, but actual functionality (creating wallets, issuing credentials, verifying) requires the backend to be running.
