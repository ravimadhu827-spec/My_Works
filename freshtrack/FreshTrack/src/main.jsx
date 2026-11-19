
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { FoodProvider } from './FoodContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FoodProvider>
      <App />
    </FoodProvider>
  </StrictMode>,
)
