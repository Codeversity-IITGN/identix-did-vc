import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWallet } from '../context/WalletContext'
import { Wallet, Loader, CheckCircle } from 'lucide-react'

const CreateDID = () => {
  const navigate = useNavigate()
  const { createDID, did } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [newDID, setNewDID] = useState(null)

  const handleCreateDID = async () => {
    setLoading(true)
    setError(null)
    try {
      const createdDID = await createDID()
      setNewDID(createdDID)
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to create DID')
    } finally {
      setLoading(false)
    }
  }

  if (did && !newDID) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DID Already Created</h2>
          <p className="text-gray-600 mb-4 font-mono text-sm break-all">{did}</p>
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    )
  }

  if (newDID) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">DID Created Successfully!</h2>
          <p className="text-gray-600 mb-4 font-mono text-sm break-all bg-gray-100 p-4 rounded">
            {newDID}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        <div className="text-center mb-6">
          <div className="bg-primary-100 p-4 rounded-full inline-block mb-4">
            <Wallet className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Your DID</h2>
          <p className="text-gray-600">
            A Decentralized Identifier (DID) is your unique identity on the blockchain.
            You'll use this to receive and manage verifiable credentials.
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What is a DID?</h3>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Your unique decentralized identity</li>
              <li>Owned and controlled by you</li>
              <li>No personal information required</li>
              <li>Compatible with W3C standards</li>
            </ul>
          </div>

          <button
            onClick={handleCreateDID}
            disabled={loading}
            className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader className="h-5 w-5 mr-2 animate-spin" />
                Creating DID...
              </>
            ) : (
              <>
                <Wallet className="h-5 w-5 mr-2" />
                Create DID
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateDID
