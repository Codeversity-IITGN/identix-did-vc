import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const WalletContext = createContext()

const API_BASE_URL = '/api'

export const WalletProvider = ({ children }) => {
  const [did, setDid] = useState(null)
  const [credentials, setCredentials] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Load DID from localStorage
    const savedDID = localStorage.getItem('identix_did')
    if (savedDID) {
      setDid(savedDID)
      loadCredentials(savedDID)
    }
  }, [])

  const loadCredentials = async (didAddress) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/credentials/holder/${didAddress}`)
      setCredentials(response.data.data || [])
    } catch (error) {
      console.error('Failed to load credentials:', error)
    }
  }

  const createDID = async () => {
    setLoading(true)
    try {
      const response = await axios.post(`${API_BASE_URL}/did/create`, {
        method: 'ethr',
      })
      const newDID = response.data.data.did
      setDid(newDID)
      localStorage.setItem('identix_did', newDID)
      return newDID
    } catch (error) {
      console.error('Failed to create DID:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addCredential = (credential) => {
    setCredentials([...credentials, credential])
  }

  const getCredential = (credentialId) => {
    return credentials.find(c => c.id === credentialId)
  }

  return (
    <WalletContext.Provider
      value={{
        did,
        credentials,
        loading,
        createDID,
        addCredential,
        getCredential,
        loadCredentials,
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
