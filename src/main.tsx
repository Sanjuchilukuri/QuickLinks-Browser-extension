import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import ThemeContextProvider from './context/ThemeContext.tsx'
import AuthContextProvider from './context/AuthContext.tsx'
import { LinksContextProvider } from './context/LinksContext.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthContextProvider>
    <ThemeContextProvider>
      <LinksContextProvider>
          <App />
      </LinksContextProvider>
    </ThemeContextProvider>
  </AuthContextProvider>
)
