/**
 * Main entry point for the Portfolio application
 * This file initializes React and renders the root component with additional configurations
 */

import React from 'react'
import ReactDOM from 'react-dom/client'
import { MotionConfig } from 'framer-motion'
// Import the main App component
import App from './App.jsx'
// Import i18n configuration for internationalization
import './i18n'
// Import global styles
import './index.css'

// Custom cursor follower
const CursorFollower = () => {
  React.useEffect(() => {
    const cursor = document.createElement('div')
    cursor.className = 'cursor-follower'
    document.body.appendChild(cursor)

    const moveCursor = (e) => {
      cursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    window.addEventListener('mousemove', moveCursor)
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.body.removeChild(cursor)
    }
  }, [])
  return null
}

// Create and render the root component with enhanced configurations
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <CursorFollower />
      <App />
    </MotionConfig>
  </React.StrictMode>,
) 