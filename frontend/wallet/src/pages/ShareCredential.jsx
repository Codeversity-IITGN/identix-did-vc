import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { QRCodeSVG } from 'qrcode.react'
import { Share2, Copy, Check } from 'lucide-react'
import axios from 'axios'

const ShareCredential = () => {
  const { credentialId } = useParams()
  const { getCredential } = useWallet()
  const [credential, setCredential] = useState(null)
  const [loading, setLoading] = useState(true)
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
          const response = await axios.get(`/api/credentials/${credentialId}`)
          setCredential(response.data.data)
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

  const handleCopy = () => {
    navigator.clipboard.writeText(credentialJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (loading) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">Loading credential...</p>
        </div>
      </div>
    )
  }

  if (!credential) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600">Credential not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Credential</h1>
          <p className="text-gray-600">Scan the QR code or copy the credential data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">QR Code</h2>
              <div className="flex justify-center p-4 bg-white border-2 border-gray-200 rounded-lg inline-block">
                <QRCodeSVG value={credentialJson} size={256} />
              </div>
              <p className="text-sm text-gray-500 mt-4">
                Verifiers can scan this QR code to verify your credential
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Credential Data</h2>
              <button
                onClick={handleCopy}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 overflow-auto max-h-96">
              <pre className="text-xs font-mono text-gray-800 whitespace-pre-wrap">
                {credentialJson}
              </pre>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">How to share:</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Show the QR code to the verifier for scanning</li>
            <li>Or copy and share the credential JSON data</li>
            <li>The verifier will verify the credential cryptographically</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ShareCredential
