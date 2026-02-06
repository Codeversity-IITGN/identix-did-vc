import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { Html5Qrcode } from 'html5-qrcode'
import { Scan, CheckCircle, XCircle, Loader, Upload } from 'lucide-react'

const VerifyCredential = () => {
  const [verificationMethod, setVerificationMethod] = useState('scan') // 'scan' or 'paste'
  const [credentialData, setCredentialData] = useState('')
  const [verificationResult, setVerificationResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [scanning, setScanning] = useState(false)
  const scannerRef = useRef(null)
  const qrCodeRegionId = 'qr-reader'

  useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {})
      }
    }
  }, [])

  const startScanning = async () => {
    try {
      setScanning(true)
      setError(null)
      scannerRef.current = new Html5Qrcode(qrCodeRegionId)
      
      await scannerRef.current.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          handleScanSuccess(decodedText)
        },
        (errorMessage) => {
          // Ignore scanning errors
        }
      )
    } catch (err) {
      setError('Failed to start camera. Please check permissions.')
      setScanning(false)
    }
  }

  const stopScanning = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current.clear()
      } catch (err) {
        // Ignore stop errors
      }
      scannerRef.current = null
    }
    setScanning(false)
  }

  const handleScanSuccess = async (decodedText) => {
    await stopScanning()
    try {
      const credential = JSON.parse(decodedText)
      await verifyCredential(credential)
    } catch (err) {
      setError('Invalid QR code data. Please try again.')
    }
  }

  const handlePasteVerification = async () => {
    if (!credentialData.trim()) {
      setError('Please paste credential data')
      return
    }

    try {
      const credential = JSON.parse(credentialData)
      await verifyCredential(credential)
    } catch (err) {
      setError('Invalid JSON format. Please check your credential data.')
    }
  }

  const verifyCredential = async (credential) => {
    setLoading(true)
    setError(null)
    setVerificationResult(null)

    try {
      const response = await axios.post('/api/credentials/verify', {
        credential,
      })

      setVerificationResult(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleMethodChange = (method) => {
    setVerificationMethod(method)
    setVerificationResult(null)
    setError(null)
    if (method === 'scan' && scanning) {
      stopScanning()
    }
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Credential</h1>
          <p className="text-gray-600">Verify the authenticity of a verifiable credential</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          <div className="mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => handleMethodChange('scan')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  verificationMethod === 'scan'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Scan className="h-5 w-5 inline-block mr-2" />
                Scan QR Code
              </button>
              <button
                onClick={() => handleMethodChange('paste')}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  verificationMethod === 'paste'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Upload className="h-5 w-5 inline-block mr-2" />
                Paste JSON
              </button>
            </div>
          </div>

          {verificationMethod === 'scan' && (
            <div className="mb-6">
              <div id={qrCodeRegionId} className="mb-4"></div>
              {!scanning ? (
                <button
                  onClick={startScanning}
                  className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Scan className="h-5 w-5 inline-block mr-2" />
                  Start Scanning
                </button>
              ) : (
                <button
                  onClick={stopScanning}
                  className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Stop Scanning
                </button>
              )}
            </div>
          )}

          {verificationMethod === 'paste' && (
            <div className="mb-6">
              <label htmlFor="credentialData" className="block text-sm font-medium text-gray-700 mb-2">
                Credential JSON
              </label>
              <textarea
                id="credentialData"
                value={credentialData}
                onChange={(e) => setCredentialData(e.target.value)}
                rows={10}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent font-mono text-sm"
                placeholder="Paste credential JSON here..."
              />
              <button
                onClick={handlePasteVerification}
                disabled={loading || !credentialData.trim()}
                className="mt-4 w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 inline-block mr-2 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  'Verify Credential'
                )}
              </button>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="text-center py-8">
              <Loader className="h-12 w-12 text-primary-600 mx-auto mb-4 animate-spin" />
              <p className="text-gray-600">Verifying credential...</p>
            </div>
          )}

          {verificationResult && (
            <div className="mt-6">
              {verificationResult.verified ? (
                <div className="p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="h-12 w-12 text-green-500 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold text-green-900">VERIFIED</h3>
                      <p className="text-green-700">This credential is authentic and valid</p>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Verification Details:</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      <li>✓ Signature verified</li>
                      <li>✓ Credential not revoked</li>
                      <li>✓ Issuer is trusted</li>
                      {verificationResult.issuer && (
                        <li>Issuer: <span className="font-mono text-xs">{verificationResult.issuer}</span></li>
                      )}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-red-50 border-2 border-red-200 rounded-lg">
                  <div className="flex items-center mb-4">
                    <XCircle className="h-12 w-12 text-red-500 mr-4" />
                    <div>
                      <h3 className="text-2xl font-bold text-red-900">VERIFICATION FAILED</h3>
                      <p className="text-red-700">
                        {verificationResult.reason || 'This credential could not be verified'}
                      </p>
                    </div>
                  </div>
                  {verificationResult.reason && (
                    <div className="bg-white rounded-lg p-4 mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Reason:</h4>
                      <p className="text-sm text-gray-700">{verificationResult.reason}</p>
                    </div>
                  )}
                </div>
              )}

              {verificationResult.credential && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Credential Details:</h4>
                  <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap overflow-auto max-h-64">
                    {JSON.stringify(verificationResult.credential, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VerifyCredential
