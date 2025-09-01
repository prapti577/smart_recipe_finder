import React, { useState } from 'react';
import API from './api';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const Login = ({ setShowLogin }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/api/users/login', {
        email: loginEmail,
        password: loginPassword,
      });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));
      }
      alert('Login successful!');
      if (setShowLogin) setShowLogin(false);
      navigate('/'); // Redirect to home page
    } catch (err) {
      alert('Login failed!');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      {/* <Navbar /> */}
      <header className="top-bar">
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>← Back</span>
        <span>Log in</span>
      </header>
      <main className="login-container">
        <h2 className="login-title">Log In</h2>
        <form onSubmit={handleLogin}>
          <label>Email</label>
          <input
            type="email"
            value={loginEmail}
            onChange={e => setLoginEmail(e.target.value)}
            required
          />
          <label>Password</label>
          <input
            type="password"
            value={loginPassword}
            onChange={e => setLoginPassword(e.target.value)}
            required
          />
          <div className="remembered">
            <input className="tick" type="checkbox" id="remember-me" />
            <label className='remember-text'>Remember me</label>
          </div>
          <p className="existing">Already have an account?</p>
          <button type="submit" className="google-btn">
            Log In
          </button>
          <a href="#" className="signup-link" onClick={() => navigate("/signup")}>Sign up</a>
        </form>
      </main>
      <footer className='footer_login'>
        <a href="" onClick={() => navigate("/about")}>About</a>
        <a href="" onClick={() => navigate("/contact")}>Contact</a>
        <a href="" onClick={() => navigate("/privacypolicy")}>Privacy Policy</a>
      </footer>
    </div>
  );
};

export default Login;