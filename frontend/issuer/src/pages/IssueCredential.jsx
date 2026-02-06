import { useState } from 'react'
import axios from 'axios'
import { FileText, Loader, CheckCircle, XCircle } from 'lucide-react'

const IssueCredential = () => {
  const [formData, setFormData] = useState({
    issuerDID: '',
    holderDID: '',
    credentialType: 'EducationalCredential',
    name: '',
    degree: '',
    institution: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const credentialSubject = {
        name: formData.name,
        degree: formData.degree,
        institution: formData.institution,
        date: formData.date,
      }

      const response = await axios.post('/api/credentials/issue', {
        issuerDID: formData.issuerDID,
        holderDID: formData.holderDID,
        credentialSubject,
        type: ['VerifiableCredential', formData.credentialType],
      })

      setResult(response.data.data)
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to issue credential')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="px-4 py-8">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow p-8">
          <div className="text-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Credential Issued Successfully!</h2>
            <p className="text-gray-600">The credential has been issued and anchored on the blockchain</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Credential ID:</h3>
            <p className="font-mono text-sm text-gray-700 break-all">{result.id}</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Credential Details:</h3>
            <pre className="text-xs font-mono text-gray-700 whitespace-pre-wrap overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>

          <button
            onClick={() => {
              setResult(null)
              setFormData({
                issuerDID: '',
                holderDID: '',
                credentialType: 'EducationalCredential',
                name: '',
                degree: '',
                institution: '',
                date: new Date().toISOString().split('T')[0],
              })
            }}
            className="w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            Issue Another Credential
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Issue Credential</h1>
          <p className="text-gray-600">Create and issue a verifiable credential to a holder</p>
        </div>

        <div className="bg-white rounded-lg shadow p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center">
                <XCircle className="h-5 w-5 text-red-500 mr-2" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="issuerDID" className="block text-sm font-medium text-gray-700 mb-2">
                Issuer DID *
              </label>
              <input
                type="text"
                id="issuerDID"
                name="issuerDID"
                value={formData.issuerDID}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="did:ethr:0x..."
              />
              <p className="mt-1 text-xs text-gray-500">Your issuer DID</p>
            </div>

            <div>
              <label htmlFor="holderDID" className="block text-sm font-medium text-gray-700 mb-2">
                Holder DID *
              </label>
              <input
                type="text"
                id="holderDID"
                name="holderDID"
                value={formData.holderDID}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="did:ethr:0x..."
              />
              <p className="mt-1 text-xs text-gray-500">Recipient's DID</p>
            </div>

            <div>
              <label htmlFor="credentialType" className="block text-sm font-medium text-gray-700 mb-2">
                Credential Type *
              </label>
              <select
                id="credentialType"
                name="credentialType"
                value={formData.credentialType}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="EducationalCredential">Educational Credential</option>
                <option value="ProfessionalCredential">Professional Credential</option>
                <option value="IdentityCredential">Identity Credential</option>
              </select>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Credential Subject</h3>

              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="degree" className="block text-sm font-medium text-gray-700 mb-2">
                    Degree / Title
                  </label>
                  <input
                    type="text"
                    id="degree"
                    name="degree"
                    value={formData.degree}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Bachelor of Science"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-gray-700 mb-2">
                    Institution *
                  </label>
                  <input
                    type="text"
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="IIT Gandhinagar"
                  />
                </div>

                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date *
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader className="h-5 w-5 mr-2 animate-spin" />
                  Issuing Credential...
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5 mr-2" />
                  Issue Credential
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default IssueCredential
