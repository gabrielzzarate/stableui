import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './playground/App'

const rootElement = document.getElementById('root')!
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
