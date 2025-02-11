/**
 * Main entry point for the Portfolio application
 * This file initializes React and renders the root component
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
// Import the main App component
import App from './App.jsx'
// Import i18n configuration for internationalization
import './i18n'
// Import global styles
import './index.css'

// Create and render the root component with React Strict Mode
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 