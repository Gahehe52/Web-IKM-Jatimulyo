import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx' //
import { Toaster } from 'react-hot-toast' // Import Toaster

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> {/* */}
      <Toaster position="top-right" /> {/* Add Toaster provider */}
      <App />
    </AuthProvider>
  </React.StrictMode>,
)