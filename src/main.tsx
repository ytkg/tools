import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { HelmetProvider } from '@dr.pogodin/react-helmet'
import './i18n'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback="loading">
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Suspense>
  </StrictMode>,
)
