import { AlertCircle } from 'lucide-react'

const BackendWarning = () => {
  return (
    <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start">
      <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-sm font-medium text-yellow-800 mb-1">Backend Not Available</p>
        <p className="text-sm text-yellow-700">
          The backend server is not running. Some features may not work. 
          Please start the backend server for full functionality.
        </p>
      </div>
    </div>
  )
}

export default BackendWarning
