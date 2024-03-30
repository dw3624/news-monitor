import Header from '@/components/base/header.tsx'
import { ThemeProvider } from '@/components/theme-provider.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <Header />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
