import React from 'react';
import './Editprofile.css';

const EditProfilePage = () => {
  return (
    <div className="edit-profile-container">
      <div className="profile-picture-placeholder"></div>
      <h2 className="edit-title">Edit Profile</h2>

      <form className="edit-form">
        <label>Name</label>
        <input type="text" placeholder="Enter your name" />

        <label>Email</label>
        <input type="email" placeholder="Enter your email" />

        <label>Change password</label>
        <input type="password" placeholder="New password" />

        <label>Contact No.</label>
        <input type="text" placeholder="Enter your contact number" />

        <button className="editsave-btn" type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
