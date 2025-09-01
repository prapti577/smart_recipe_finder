import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Addtofav from './Addtofav';
import RecipeDetail from './Viewrecipe';
import SignUpPage from './Signuppage';
import EditProfilePage from './Editprofile';
import AddRecipePage from './Addnewrecipe';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Login from './Login';
import Profile from './Profile';
import FavroitePage from './Favoritepage';
import MyRecipe from './Myrecipe';
import Browse from './Browse'; // Importing the Browse component`
import About from './About';
import Contact from './Contact';
import PrivacyPolicy from './Privacypolicy';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/addtofav" element={<Addtofav />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/Viewrecipe" element={<RecipeDetail />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/editprofile" element={<EditProfilePage />} />
        <Route path="/addrecipe" element={<AddRecipePage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path = "/login" element={<Login />} />
        <Route path="/favoritepage" element={<FavroitePage />} />
        <Route path="/myrecipe" element={<MyRecipe />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<PrivacyPolicy />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
reportWebVitals();
