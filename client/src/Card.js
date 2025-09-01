import React, { useState } from 'react';
import './Card.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Card = ({ recipe, onView }) => {
  // localStorage stores user as JSON string; parse to get actual id
  let storedUser = null;
  try {
    storedUser = JSON.parse(localStorage.getItem('user'));
  } catch (e) {
    storedUser = localStorage.getItem('user');
  }
  const userId = storedUser && (storedUser._id || storedUser.userId || storedUser);
  const [isFavorite, setIsFavorite] = useState(Boolean(recipe && recipe.favoritedBy && userId && recipe.favoritedBy.map(id => String(id)).includes(String(userId))));
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFavorite = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/recipes/favorite/${recipe._id}`,
        { recipeId: recipe._id },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
      );
      if (response && response.data && response.data.success) {
        console.log('Favorite response:', response.data);
        if (typeof response.data.favorited !== 'undefined') {
          setIsFavorite(Boolean(response.data.favorited));
          alert(response.data.favorited ? 'Added to favorites' : 'Removed from favorites');
        } else {
          setIsFavorite(prev => !prev);
          alert('Favorite toggled');
        }
        setError(null);
      } else {
        const msg = response && response.data && response.data.error ? response.data.error : 'Failed to favorite recipe.';
        console.error('Favorite error response:', response && response.data);
        setError(msg);
      }
    } catch (err) {
      console.error('Favorite request failed:', err);
      setError(err.response && err.response.data && err.response.data.error ? err.response.data.error : 'An error occurred while favoriting the recipe.');
    }
  };

  return (
    <div className="card">
      <h3>{recipe.name}</h3>
      <p>⏱️ {recipe.cookingTime} ⭐ {recipe.rating || 'N/A'}</p>
      <div className="card-buttons">
        <button className="view-btn" onClick={() => navigate(`/recipe/${recipe._id}`)}>View ›</button>
        <button onClick={handleFavorite} className={`save-btn ${isFavorite ? 'favorited' : ''}`} title={isFavorite ? 'Remove favorite' : 'Save'} aria-pressed={isFavorite}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24">
            <path d="M6 2a2 2 0 0 0-2 2v18l8-5.333L20 22V4a2 2 0 0 0-2-2H6zm0 2h12v15.333l-6-4-6 4V4z"/>
          </svg>
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Card;