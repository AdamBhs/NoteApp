import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../Login/loginStyle.css';
import { validateEmail } from '../../utils/helprs';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // to redirect after successful signup

  const handleSignUp = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!username) {
      setError('Please enter a name');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError(null); 
    try {
      const response = await fetch('http://localhost:3000/signup', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setError('There was an error with the signup process.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSignUp}>
      <div className="login-container">
        <h3 className="login-title">SignUp</h3>

        <input
          className="login-input"
          type="text"
          placeholder="Name"
          value={username}
          onChange={(n) => setName(n.target.value)}
        />

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
          Sign Up
        </button>

        <p className="login-reg">
          Already have an Account? <Link to="/login">Login</Link>
        </p>
      </div>
    </form>
  );
}
