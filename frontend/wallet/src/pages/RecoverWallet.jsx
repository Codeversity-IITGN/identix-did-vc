import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { RotateCcw, Loader, AlertCircle, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const RecoverWallet = () => {
  const navigate = useNavigate()
  const { recoverDID, loading } = useWallet()
  const [seedPhrase, setSeedPhrase] = useState('')
  const [error, setError] = useState(null)

  const handleRecover = async (e) => {
    e.preventDefault()
    setError(null)

    // Validate seed phrase (should be 12 words)
    const words = seedPhrase.trim().split(/\s+/)
    if (words.length !== 12) {
      setError('Seed phrase must contain exactly 12 words')
      return
    }

    try {
      await recoverDID(seedPhrase.trim())
      navigate('/credentials')
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to recover wallet. Please check your seed phrase.')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <Link
          to="/"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>

        <div className="text-center mb-8">
          <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
            <RotateCcw className="h-12 w-12 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Recover Wallet</h2>
          <p className="text-gray-600">
            Enter your 12-word seed phrase to recover your wallet
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleRecover} className="space-y-6">
          <div>
            <label htmlFor="seedPhrase" className="block text-sm font-medium text-gray-700 mb-2">
              Seed Phrase
            </label>
            <textarea
              id="seedPhrase"
              value={seedPhrase}
              onChange={(e) => setSeedPhrase(e.target.value)}
              rows={4}
              placeholder="Enter your 12-word seed phrase separated by spaces"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              required
            />
            <p className="mt-2 text-xs text-gray-500">
              Enter all 12 words separated by spaces
            </p>
          </div>

          <button
            type="submit"
            disabled={loading || !seedPhrase.trim()}
            className="w-full flex items-center justify-center px-6 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Recovering Wallet...
              </>
            ) : (
              <>
                <RotateCcw className="h-5 w-5 mr-2" />
                Recover Wallet
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default RecoverWallet
