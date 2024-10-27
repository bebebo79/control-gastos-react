import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BudgerProvider } from './context/BudgetContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <BudgerProvider>
      <App />
    </BudgerProvider>
    
  </StrictMode>,
)
