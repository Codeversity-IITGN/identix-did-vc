import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { Award, Wallet, AlertCircle, Loader, Play } from 'lucide-react'
import { DEMO_WALLET_ADDRESS, DEMO_ISSUER_DID } from '../utils/demoData'

const Login = () => {
  const navigate = useNavigate()
  const { account, connectWallet, loading, error, isConnected } = useWallet()

  const handleDemoMode = () => {
    localStorage.setItem('identix_issuer_demo_mode', 'true')
    localStorage.setItem('identix_issuer_account', DEMO_WALLET_ADDRESS)
    navigate('/issue')
  }

  useEffect(() => {
    if (isConnected) {
      navigate('/issue')
    }
  }, [isConnected, navigate])

  const handleConnect = async () => {
    const connected = await connectWallet()
    if (connected) {
      navigate('/issue')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-purple-100 p-4 rounded-full inline-block mb-4">
            <Award className="h-12 w-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IdentiX Issuer</h1>
          <p className="text-gray-600">
            Issue and manage verifiable credentials
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-600 font-medium mb-1">Connection Error</p>
              <p className="text-sm text-red-600">{error}</p>
            </div>
          </div>
        )}

        {account ? (
          <div className="mb-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <div className="bg-green-500 w-3 h-3 rounded-full mr-2"></div>
                <span className="text-sm font-medium text-green-800">Connected</span>
              </div>
              <p className="text-sm text-green-700 font-mono break-all">{account}</p>
            </div>
            <button
              onClick={() => navigate('/issue')}
              className="w-full mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Continue to Dashboard
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> You need MetaMask installed to use the Issuer app.
                The backend will validate that your wallet address is authorized to issue credentials.
              </p>
            </div>

            <button
              onClick={handleConnect}
              disabled={loading}
              className="w-full flex items-center justify-center px-6 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="h-5 w-5 mr-2" />
                  Connect MetaMask
                </>
              )}
            </button>

            {typeof window.ethereum === 'undefined' && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800 mb-2">
                  <strong>MetaMask not detected</strong>
                </p>
                <a
                  href="https://metamask.io/download/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-yellow-700 underline"
                >
                  Install MetaMask →
                </a>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleDemoMode}
                className="w-full flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                <Play className="h-5 w-5 mr-2" />
                Try Demo Mode (No MetaMask/Backend Required)
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Login
