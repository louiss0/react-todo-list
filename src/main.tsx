import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'uno.css'
import 'virtual:unocss-devtools'
import '@unocss/reset/tailwind.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
