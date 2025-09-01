import './Signuppage.css';
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      await axios.post("http://localhost:5000/api/users/add", {
        name,
        email,
        password,
      });
      alert("User added!");
    } catch (err) {
      // Show backend error message if user already exists
      if (err.response && err.response.data && err.response.data.error) {
        alert(err.response.data.error); // Will show "User already exists"
      } else {
        alert("Signup failed!");
      }
    }
  };

  return (
    <div className="signup-container">
      <h2 className="signup-title">Sign up</h2>

      <form className="signup-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" placeholder="Enter your name" onChange={(e) => setName(e.target.value)} />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />

        <label>Password</label>
        <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />

        <label>Confirm password</label>
        <input type="password" placeholder="Re-enter password" onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="signup-btn" type="submit">Sign up</button>
      </form>

      <p className="login-redirect">
        Have an account? 
        <button type="button" className="login-link" onClick={() => navigate('/', { state: { showLogin: true } })}>
          Log in
        </button>
      </p>
    </div>
  );
};

export default SignUpPage;
