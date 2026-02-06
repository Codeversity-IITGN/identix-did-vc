import axios from 'axios'

const API_BASE_URL = '/api'

// Check if backend is available
export const isBackendAvailable = async () => {
  try {
    await axios.get(`${API_BASE_URL.replace('/api', '')}/health`, { timeout: 1000 })
    return true
  } catch (error) {
    return false
  }
}

// Wrapper for API calls with error handling
export const apiCall = async (method, url, data = null) => {
  try {
    const config = {
      method,
      url: `${API_BASE_URL}${url}`,
      timeout: 5000,
    }
    
    if (data) {
      config.data = data
    }
    
    const response = await axios(config)
    return { success: true, data: response.data }
  } catch (error) {
    if (error.code === 'ECONNREFUSED' || error.message.includes('Network Error')) {
      return {
        success: false,
        error: 'Backend is not available. Please start the backend server.',
        offline: true,
      }
    }
    return {
      success: false,
      error: error.response?.data?.error?.message || error.message,
      offline: false,
    }
  }
}
