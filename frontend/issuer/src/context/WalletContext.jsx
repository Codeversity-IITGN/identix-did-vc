import { createContext, useContext, useState, useEffect } from 'react'
import { ethers } from 'ethers'

const WalletContext = createContext()

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if demo mode is enabled
    const demoMode = localStorage.getItem('identix_issuer_demo_mode')
    const demoAccount = localStorage.getItem('identix_issuer_account')
    
    if (demoMode === 'true' && demoAccount) {
      setAccount(demoAccount)
      // Create a mock provider for demo mode
      setProvider({ isDemo: true })
    } else {
      // Check if already connected
      checkConnection()
    }
  }, [])

  const checkConnection = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          setAccount(accounts[0])
          const provider = new ethers.BrowserProvider(window.ethereum)
          setProvider(provider)
        }
      } catch (err) {
        console.error('Error checking connection:', err)
      }
    }
  }

  const connectWallet = async () => {
    setLoading(true)
    setError(null)

    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.')
      setLoading(false)
      return false
    }

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (accounts.length > 0) {
        setAccount(accounts[0])
        const provider = new ethers.BrowserProvider(window.ethereum)
        setProvider(provider)

        // Listen for account changes
        window.ethereum.on('accountsChanged', (newAccounts) => {
          if (newAccounts.length > 0) {
            setAccount(newAccounts[0])
          } else {
            setAccount(null)
            setProvider(null)
          }
        })

        return true
      }
      return false
    } catch (err) {
      setError('Failed to connect wallet. Please try again.')
      console.error('Wallet connection error:', err)
      return false
    } finally {
      setLoading(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setProvider(null)
  }

  return (
    <WalletContext.Provider
      value={{
        account,
        provider,
        loading,
        error,
        connectWallet,
        disconnectWallet,
        isConnected: !!account,
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
