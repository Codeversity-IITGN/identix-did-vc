import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { QRCodeSVG } from 'qrcode.react'
import { ArrowLeft, Share2, Copy, Check, CreditCard, AlertCircle } from 'lucide-react'
import axios from 'axios'

const CredentialDetail = () => {
  const { credentialId } = useParams()
  const navigate = useNavigate()
  const { getCredential } = useWallet()
  const [credential, setCredential] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showQR, setShowQR] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const loadCredential = async () => {
      try {
        // Try to get from local state first
        const localCredential = getCredential(credentialId)
        if (localCredential) {
          setCredential(localCredential)
        } else {
          // Fetch from API
          try {
            const response = await axios.get(`/api/credentials/${credentialId}`, { timeout: 3000 })
            const cred = response.data.data
            // Handle both credential object and stored credential format
            setCredential(cred.credential || cred)
          } catch (err) {
            // Use demo credential when backend is unavailable
            console.warn('Backend unavailable, using demo credential')
            const { DEMO_CREDENTIALS } = await import('../utils/demoData')
            const demoCred = DEMO_CREDENTIALS.find(c => c.id === credentialId || c.credentialId === credentialId)
            if (demoCred) {
              setCredential(demoCred)
            }
          }
        }
      } catch (error) {
        console.error('Failed to load credential:', error)
      } finally {
        setLoading(false)
      }
    }

    loadCredential()
  }, [credentialId, getCredential])

  const credentialJson = credential ? JSON.stringify(credential, null, 2) : ''
  const credentialType = credential 
    ? (Array.isArray(credential.type) 
        ? credential.type[1] || credential.type[0] 
        : credential.type || 'Credential')
    : 'Credential'

  const handleCopy = () => {
    navigator.clipboard.writeText(credentialJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Loading credential...</p>
        </div>
      </div>
    )
  }

  if (!credential) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Credential Not Found</h2>
          <button
            onClick={() => navigate('/credentials')}
            className="text-primary-600 hover:text-primary-700"
          >
            Back to Credentials
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <button
              onClick={() => navigate('/credentials')}
              className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Credential Details</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="bg-white bg-opacity-20 p-3 rounded-lg inline-block mb-4">
                  <CreditCard className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold mb-2">{credentialType}</h2>
                {credential.status === 'revoked' && (
                  <div className="inline-flex items-center bg-red-500 px-3 py-1 rounded-full text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    Revoked
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Credential Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-500">Issuer</label>
                <p className="mt-1 text-gray-900 font-mono text-sm break-all">
                  {credential.issuer?.id || credential.issuer || 'Unknown'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-500">Issue Date</label>
                <p className="mt-1 text-gray-900">
                  {credential.issuanceDate 
                    ? new Date(credential.issuanceDate).toLocaleString()
                    : 'N/A'}
                </p>
              </div>
              {credential.credentialSubject && (
                <>
                  {Object.entries(credential.credentialSubject).map(([key, value]) => {
                    if (key === 'id') return null
                    return (
                      <div key={key}>
                        <label className="text-sm font-medium text-gray-500 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </label>
                        <p className="mt-1 text-gray-900">{String(value)}</p>
                      </div>
                    )
                  })}
                </>
              )}
            </div>

            {/* Share Button */}
            {!showQR && (
              <button
                onClick={() => setShowQR(true)}
                className="w-full flex items-center justify-center px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <Share2 className="h-5 w-5 mr-2" />
                Share via QR Code
              </button>
            )}

            {/* QR Code Display */}
            {showQR && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <div className="text-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Credential</h3>
                  <p className="text-sm text-gray-600">
                    Scan this QR code to share your credential
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white p-4 border-2 border-gray-200 rounded-lg">
                      <QRCodeSVG value={credentialJson} size={256} />
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4 mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-gray-700">Credential JSON</label>
                        <button
                          onClick={handleCopy}
                          className="flex items-center text-sm text-primary-600 hover:text-primary-700"
                        >
                          {copied ? (
                            <>
                              <Check className="h-4 w-4 mr-1" />
                              Copied!
                            </>
                          ) : (
                            <>
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </>
                          )}
                        </button>
                      </div>
                      <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap overflow-auto max-h-64 bg-white p-2 rounded">
                        {credentialJson}
                      </pre>
                    </div>
                    <button
                      onClick={() => setShowQR(false)}
                      className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                    >
                      Hide QR Code
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default CredentialDetail
