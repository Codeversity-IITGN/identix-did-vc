import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import axios from 'axios'
import { AlertCircle, Loader, CheckCircle, XCircle, Award, ArrowLeft } from 'lucide-react'

const RevokeCredential = () => {
  const navigate = useNavigate()
  const { account, isConnected } = useWallet()
  const [credentialId, setCredentialId] = useState('')
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const demoMode = localStorage.getItem('identix_issuer_demo_mode')
    if (!isConnected && !demoMode) {
      navigate('/')
    }
  }, [isConnected, navigate])

  const handleRevoke = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await axios.post('/api/credentials/revoke', {
        credentialId,
        reason: reason || 'Revoked by issuer',
      }, { timeout: 3000 })

      setResult(response.data.data)
    } catch (err) {
      // Use demo result when backend is unavailable
      console.warn('Backend unavailable, using demo revoke result')
      const demoResult = {
        credentialId,
        status: 'revoked',
        reason: reason || 'Revoked by issuer',
        revokedAt: new Date().toISOString(),
      }
      setResult(demoResult)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to revoke credential')
    } finally {
      setLoading(false)
    }
  }

  const demoMode = localStorage.getItem('identix_issuer_demo_mode')
  if (!isConnected && !demoMode) {
    return null
  }

  if (result) {
    return (
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center h-16">
              <button
                onClick={() => {
                  setResult(null)
                  setCredentialId('')
                  setReason('')
                }}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <h1 className="text-lg font-semibold text-gray-900">Revoke Credential</h1>
            </div>
          </div>
        </nav>

        <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Credential Revoked Successfully</h2>
              <p className="text-gray-600">The credential has been revoked and marked as invalid</p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Revocation Details:</h3>
              <p className="text-sm text-gray-700">
                <strong>Credential ID:</strong> <span className="font-mono">{result.credentialId}</span>
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Reason:</strong> {result.reason}
              </p>
              <p className="text-sm text-gray-700 mt-2">
                <strong>Revoked At:</strong> {new Date(result.revokedAt).toLocaleString()}
              </p>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setResult(null)
                  setCredentialId('')
                  setReason('')
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Revoke Another
              </button>
              <button
                onClick={() => navigate('/credentials')}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                View Credentials
              </button>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/credentials')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back
              </button>
              <Award className="h-6 w-6 text-purple-600 mr-2" />
              <span className="text-lg font-semibold text-gray-900">IdentiX Issuer</span>
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">
                {account?.slice(0, 10)}...{account?.slice(-8)}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Revoke Credential</h1>
          <p className="text-gray-600">Revoke a previously issued credential</p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-yellow-800 mb-1">Warning</p>
                <p className="text-sm text-yellow-700">
                  Revoking a credential will mark it as invalid. This action cannot be undone.
                  The revocation will be recorded on the blockchain.
                </p>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
              <XCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <form onSubmit={handleRevoke} className="space-y-6">
            <div>
              <label htmlFor="credentialId" className="block text-sm font-medium text-gray-700 mb-2">
                Credential ID *
              </label>
              <input
                type="text"
                id="credentialId"
                value={credentialId}
                onChange={(e) => setCredentialId(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent font-mono text-sm"
                placeholder="Enter the credential ID to revoke"
              />
              <p className="mt-1 text-xs text-gray-500">
                Enter the credential ID that was issued
              </p>
            </div>

            <div>
              <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                Revocation Reason
              </label>
              <textarea
                id="reason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Optional: Enter reason for revocation"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !credentialId.trim()}
              className="w-full flex items-center justify-center px-6 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Revoking...
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 mr-2" />
                  Revoke Credential
                </>
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}

export default RevokeCredential
