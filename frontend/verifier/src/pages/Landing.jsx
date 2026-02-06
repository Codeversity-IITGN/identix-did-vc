import { useNavigate } from 'react-router-dom'
import { Shield, CheckCircle, Play } from 'lucide-react'
import { DEMO_CREDENTIAL_JSON, DEMO_VERIFICATION_RESULT } from '../utils/demoData'

const Landing = () => {
  const navigate = useNavigate()

  const handleDemoVerify = () => {
    sessionStorage.setItem('verificationResult', JSON.stringify(DEMO_VERIFICATION_RESULT))
    navigate('/result')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-green-100 p-4 rounded-full inline-block mb-4">
            <Shield className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IdentiX Verifier</h1>
          <p className="text-gray-600">
            Verify the authenticity of verifiable credentials
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Cryptographic Verification</h3>
              <p className="text-sm text-gray-600">Verify credentials using cryptographic signatures</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Blockchain Check</h3>
              <p className="text-sm text-gray-600">Check revocation status on blockchain</p>
            </div>
          </div>
          <div className="flex items-start">
            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-gray-900">Instant Results</h3>
              <p className="text-sm text-gray-600">Get verification results in seconds</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/verify')}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Verify Credential
          </button>
          <button
            onClick={handleDemoVerify}
            className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Play className="h-5 w-5 inline-block mr-2" />
            Try Demo Verification (No Backend Required)
          </button>
        </div>
      </div>
    </div>
  )
}

export default Landing
