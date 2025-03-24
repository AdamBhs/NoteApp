import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import { AuthContext, AuthProvider } from "./context/AuthContext";
import { useContext } from 'react';

export default function App() {

  // eslint-disable-next-line react/prop-types
  const PrivateRoute = ({ children }) => {
    const { token } = useContext(AuthContext);
    return token ? children : <Navigate to="/login" />;
  };
  

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<PrivateRoute><Home /></PrivateRoute>} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}
