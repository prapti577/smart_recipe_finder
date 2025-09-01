import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Profile.css'; // Assuming you have a CSS file for styling

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };


  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div style={{ padding: '2rem' }}>
      {/* <Navbar /> */}
      <header className="top-bar">
        <span style={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>← Back</span>
        <span>User Profile</span>
      </header>
      <main className="profile-container">
        <div className="profile-header">
          <div className="avatar"></div>
          <h2>{user?.name || 'User'}</h2>
          <button className="editprofile" onClick={() => navigate("/editprofile")}>Edit Profile</button>
        </div>
        <div className="profile-options">
          <ul>
            <li><strong>< a href='/myrecipe' className='profile-links'>My Recipe</a></strong></li>
            <li><strong><a href='/addtofav' className='profile-links'>Favorites</a></strong></li>
            <li><strong><a href='/addrecipe' className='profile-links'>Add Recipe</a></strong></li>
          </ul>
        </div>
        <div className="logout"  onClick={handleLogout}>
          <a href="#">Log Out</a>
        </div>
      </main>
      <footer className='footer_login'>
        <a href="" onClick={() => navigate("/about")}>About</a>
        <a href="" onClick={() => navigate("/contact")}>Contact</a>
        <a href="" onClick={() => navigate("/privacypolicy")}>Privacy Policy</a>
      </footer>
    </div>
  );
};

export default Profile;