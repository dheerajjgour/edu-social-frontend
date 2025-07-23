import { createContext, useEffect, useState } from "react";
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const storedUser = localStorage.getItem("loggedInUser");
      
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          
          // Optional: Verify token is still valid with API
          // await axios.get('/api/validate-token');
          
          setUser(parsedUser);
          axios.defaults.headers.common['Authorization'] = `Bearer ${parsedUser.token}`;
        } catch (error) {
          console.error("Invalid user data:", error);
          localStorage.removeItem("loggedInUser");
        }
      }
      
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (userData) => {
    setUser(userData);
    localStorage.setItem("loggedInUser", JSON.stringify(userData));
    axios.defaults.headers.common['Authorization'] = `Bearer ${userData.token}`;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
    delete axios.defaults.headers.common['Authorization'];  
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};