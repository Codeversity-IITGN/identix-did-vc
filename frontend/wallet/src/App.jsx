import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Credentials from './pages/Credentials'
import CreateDID from './pages/CreateDID'
import ShareCredential from './pages/ShareCredential'
import Layout from './components/Layout'
import { WalletProvider } from './context/WalletContext'

function App() {
  return (
    <WalletProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/credentials" element={<Credentials />} />
            <Route path="/create-did" element={<CreateDID />} />
            <Route path="/share/:credentialId" element={<ShareCredential />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </WalletProvider>
  )
}

export default App
