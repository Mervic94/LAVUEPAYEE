import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { initSentry } from './integrations/sentry'
import App from './App.tsx'
import './index.css'

import { Toaster } from "@/components/ui/toaster"

// Initialiser Sentry avant tout rendu
initSentry();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>,
)
