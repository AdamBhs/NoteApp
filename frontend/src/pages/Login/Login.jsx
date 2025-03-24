import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './loginStyle.css';
import { validateEmail } from '../../utils/helprs';
import {login} from '../../utils/axiosInstance';
import { AuthContext } from '../../context/AuthContext';

export default function Login() {
 
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const { login: authLogin } = useContext(AuthContext);
 const [error, setError] = useState(null);
 
 const navigate = useNavigate();
 
 const handleLogin = async (e) => {
  e.preventDefault();
  
  if (!validateEmail(email)) {
   setError('Please enter a valid email address');
   return;
  }

  if (!password) {
   setError('Please enter the password');
   return;
  }

  setError(null);

  // Add your login logic here (API call, authentication, etc.)
  try {
    const res = await login(email, password);
    authLogin(res.data.token);
    navigate("/dashboard");
  } catch (error) {
    if(error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
    }else {
        setError("An unexpected error");
    }
  }
 };

 return (
  <form onSubmit={handleLogin}>
   <div className="login-container">
    <h3 className="login-title">Login</h3>

    <input
     className="login-input"
     type="email"
     placeholder="Email"
     value={email}
     onChange={(e) => setEmail(e.target.value)}
    />

    <input
     className="login-input"
     type="password"
     placeholder="Password"
     value={password}
     onChange={(e) => setPassword(e.target.value)}
    />

    {error && <p className="email-error">{error}</p>}

    <button className="login-btn" type="submit">
     Login
    </button>

    <p className="login-reg">
     Not registered yet? <Link to="/signup">Create an Account</Link>
    </p>
   </div>
  </form>
 );
}
