import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
 const [user, setUser] = useState(null);
 const { logout } = useAuth();

 useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) {
   logout();
   return;
  }

  const fetchUsername = async () => {
   try {
    const response = await fetch('http://localhost:3000/api/user', {
     headers: {
      Authorization: `Bearer ${token}`,
     },
    });

    if (!response.ok) throw new Error('Invalid token');

    const data = await response.json();
    setUser({ username: data.username });
   } catch (error) {
    console.error('Failed to fetch user:', error);
    logout();
   }
  };

  fetchUsername();
 }, [logout]);

 return (
  <UserContext.Provider value={{ user, setUser }}>
   {children}
  </UserContext.Provider>
 );
};
