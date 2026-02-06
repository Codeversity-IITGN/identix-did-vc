import { Link } from 'react-router-dom'
import { Shield, Scan, CheckCircle } from 'lucide-react'

const Dashboard = () => {
  return (
    <div className="px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Verifier Dashboard</h1>
        <p className="text-gray-600">Verify the authenticity of verifiable credentials</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Status</p>
              <p className="text-lg font-semibold text-green-600 mt-1">Ready</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Role</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">Verifier</p>
            </div>
            <Shield className="h-8 w-8 text-primary-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Method</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">Cryptographic</p>
            </div>
            <Scan className="h-8 w-8 text-primary-500" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Quick Actions</h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              to="/verify"
              className="flex items-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <div className="bg-primary-100 p-3 rounded-lg mr-4">
                <Scan className="h-6 w-6 text-primary-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Verify Credential</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Scan QR code or paste credential data to verify
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">How verification works:</h3>
        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
          <li>Scan the QR code or paste the credential JSON</li>
          <li>Cryptographic signature is verified</li>
          <li>Blockchain is checked for revocation status</li>
          <li>Issuer trust is verified from the registry</li>
          <li>Result is displayed: VERIFIED or REVOKED</li>
        </ol>
      </div>
    </div>
  )
}

export default Dashboard
