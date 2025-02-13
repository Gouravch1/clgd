import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'  // Changed from App.css to index.css
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)