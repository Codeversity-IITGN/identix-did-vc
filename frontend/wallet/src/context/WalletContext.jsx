import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { DEMO_DID, DEMO_SEED_PHRASE, DEMO_CREDENTIALS, isDemoMode, enableDemoMode } from '../utils/demoData'

const WalletContext = createContext()

const API_BASE_URL = '/api'

export const WalletProvider = ({ children }) => {
  const [did, setDid] = useState(null)
  const [seedPhrase, setSeedPhrase] = useState(null)
  const [credentials, setCredentials] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load DID from localStorage or use demo mode
    const savedDID = localStorage.getItem('identix_did')
    const savedSeedPhrase = localStorage.getItem('identix_seed_phrase')
    
    if (savedDID) {
      setDid(savedDID)
      if (savedSeedPhrase) {
        setSeedPhrase(savedSeedPhrase)
      }
      loadCredentials(savedDID)
    } else if (isDemoMode()) {
      // Auto-enable demo mode if no DID exists
      setDid(DEMO_DID)
      setSeedPhrase(DEMO_SEED_PHRASE)
      loadCredentials(DEMO_DID)
    }
  }, [])

  const loadCredentials = async (didAddress) => {
    // Use demo data if backend is unavailable
    if (isDemoMode()) {
      setCredentials(DEMO_CREDENTIALS)
      return
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/credentials/holder/${didAddress}`, {
        timeout: 3000,
      })
      setCredentials(response.data.data || [])
    } catch (error) {
      console.warn('Backend unavailable, using demo data:', error.message)
      // Use demo data when backend is unavailable
      setCredentials(DEMO_CREDENTIALS)
    }
  }

  const createDID = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/did/create`, {
        method: 'ethr',
      }, { timeout: 3000 })
      const newDID = response.data.data.did
      setDid(newDID)
      localStorage.setItem('identix_did', newDID)
      
      // Generate a mock seed phrase (in production, this would come from backend)
      const mockSeedPhrase = generateMockSeedPhrase()
      setSeedPhrase(mockSeedPhrase)
      localStorage.setItem('identix_seed_phrase', mockSeedPhrase)
      
      await loadCredentials(newDID)
      return { did: newDID, seedPhrase: mockSeedPhrase }
    } catch (error) {
      console.warn('Backend unavailable, using demo mode:', error.message)
      // Use demo data when backend is unavailable
      enableDemoMode()
      setDid(DEMO_DID)
      setSeedPhrase(DEMO_SEED_PHRASE)
      await loadCredentials(DEMO_DID)
      return { did: DEMO_DID, seedPhrase: DEMO_SEED_PHRASE }
    } finally {
      setLoading(false)
    }
  }

  const recoverDID = async (seedPhrase) => {
    setLoading(true)
    try {
      // Note: Backend endpoint /api/did/recover needs to be implemented
      const response = await axios.post(`${API_BASE_URL}/did/recover`, {
        seedPhrase,
      })
      const recoveredDID = response.data.data.did
      setDid(recoveredDID)
      setSeedPhrase(seedPhrase)
      localStorage.setItem('identix_did', recoveredDID)
      localStorage.setItem('identix_seed_phrase', seedPhrase)
      await loadCredentials(recoveredDID)
      return recoveredDID
    } catch (error) {
      console.error('Failed to recover DID:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const getCredential = (credentialId) => {
    return credentials.find(c => c.id === credentialId || c.credentialId === credentialId)
  }

  const refreshCredentials = () => {
    if (did) {
      loadCredentials(did)
    }
  }

  return (
    <WalletContext.Provider
      value={{
        did,
        seedPhrase,
        credentials,
        loading,
        createDID,
        recoverDID,
        getCredential,
        refreshCredentials,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider')
  }
  return context
}

// Mock seed phrase generator (for demo purposes)
function generateMockSeedPhrase() {
  const words = [
    'abandon', 'ability', 'able', 'about', 'above', 'absent', 'absorb', 'abstract',
    'absurd', 'abuse', 'access', 'accident', 'account', 'accuse', 'achieve', 'acid',
    'acoustic', 'acquire', 'across', 'act', 'action', 'actor', 'actual', 'adapt',
    'add', 'addict', 'address', 'adjust', 'admit', 'adult', 'advance', 'advice'
  ]
  const seedPhrase = []
  for (let i = 0; i < 12; i++) {
    seedPhrase.push(words[Math.floor(Math.random() * words.length)])
  }
  return seedPhrase.join(' ')
}
