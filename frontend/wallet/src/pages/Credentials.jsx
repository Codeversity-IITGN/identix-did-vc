import { useEffect } from 'react'
import { useWallet } from '../context/WalletContext'
import { Link } from 'react-router-dom'
import { CreditCard, Share2, Calendar, User } from 'lucide-react'

const Credentials = () => {
  const { did, credentials, loadCredentials } = useWallet()

  useEffect(() => {
    if (did) {
      loadCredentials(did)
    }
  }, [did])

  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Credentials</h1>
        <p className="text-gray-600">View and manage your verifiable credentials</p>
      </div>

      {!did ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 mb-4">Please create a DID first to view credentials</p>
          <Link
            to="/create-did"
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Create DID
          </Link>
        </div>
      ) : credentials.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <CreditCard className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No Credentials Yet</h3>
          <p className="text-gray-600">
            Credentials issued to your DID will appear here
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {credentials.map((credential) => (
            <div
              key={credential.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <CreditCard className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">
                        {credential.type?.[1] || credential.type || 'Credential'}
                      </h3>
                      <p className="text-sm text-gray-500 font-mono text-xs mt-1">
                        {credential.id?.slice(0, 20)}...
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(credential.issuanceDate).toLocaleDateString()}
                  </div>
                  {credential.credentialSubject && (
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-2" />
                      {credential.credentialSubject.name || 'N/A'}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <Link
                    to={`/share/${credential.id}`}
                    className="w-full inline-flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Credential
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Credentials
