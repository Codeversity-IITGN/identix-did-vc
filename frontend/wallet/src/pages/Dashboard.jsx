import { useWallet } from '../context/WalletContext'
import { Link } from 'react-router-dom'
import { CreditCard, Plus, Share2, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  const { did, credentials } = useWallet()

  if (!did) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Welcome to IdentiX Wallet</h2>
          <p className="text-gray-600 mb-6">
            Create your decentralized identity to start receiving and managing verifiable credentials.
          </p>
          <Link
            to="/create-did"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            Create DID
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Manage your decentralized identity and credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Your DID</p>
              <p className="text-lg font-semibold text-gray-900 mt-1 font-mono text-xs break-all">
                {did}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credentials</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{credentials.length}</p>
            </div>
            <CreditCard className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg font-semibold text-green-600 mt-1">Active</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Recent Credentials</h2>
        </div>
        <div className="p-6">
          {credentials.length === 0 ? (
            <div className="text-center py-12">
              <CreditCard className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No credentials yet</p>
              <p className="text-sm text-gray-500">
                Credentials issued to you will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {credentials.slice(0, 5).map((credential) => (
                <div
                  key={credential.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {credential.type?.[1] || credential.type || 'Credential'}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">
                      Issued: {new Date(credential.issuanceDate).toLocaleDateString()}
                    </p>
                  </div>
                  <Link
                    to={`/share/${credential.id}`}
                    className="ml-4 inline-flex items-center px-3 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
