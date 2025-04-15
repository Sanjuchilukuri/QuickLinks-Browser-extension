import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import ThemeContextProvider from './context/ThemeContext.tsx'
import AuthContextProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </AuthContextProvider>
)
