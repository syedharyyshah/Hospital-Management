import { StrictMode, createContext, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import axios from 'axios'
import { AuthProvider } from './pages/AuthContext.jsx';

export const Context = createContext({isAuthenticated:false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/patient/me",
          { withCredentials: true }
        );
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  // Don't render the app until we've checked auth status
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider value={{isAuthenticated, setIsAuthenticated, user, setUser}}>
      <AuthProvider>
      <App />
      </AuthProvider>
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);