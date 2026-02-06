import { Link } from 'react-router-dom'
import { Wallet, Plus, RotateCcw, Play } from 'lucide-react'
import { enableDemoMode } from '../utils/demoData'

const Welcome = () => {
  const handleDemoMode = () => {
    enableDemoMode()
    window.location.href = '/credentials'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
            <Wallet className="h-12 w-12 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">IdentiX Wallet</h1>
          <p className="text-gray-600">
            Your secure digital identity wallet for verifiable credentials
          </p>
        </div>

        <div className="space-y-4">
          <Link
            to="/create-wallet"
            className="w-full flex items-center justify-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create New Wallet
          </Link>

          <Link
            to="/recover-wallet"
            className="w-full flex items-center justify-center px-6 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg hover:border-primary-500 hover:text-primary-600 transition-colors font-medium"
          >
            <RotateCcw className="h-5 w-5 mr-2" />
            Recover Wallet
          </Link>

          <button
            onClick={handleDemoMode}
            className="w-full flex items-center justify-center px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <Play className="h-5 w-5 mr-2" />
            Try Demo Mode (No Backend Required)
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Your credentials are stored securely and controlled by you.
            No personal data is stored on the blockchain.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
