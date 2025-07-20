import { StrictMode, createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'

export const Context = createContext();

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({}); // Changed from false to empty object

  return (
    <Context.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser
      }}
    >
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
)