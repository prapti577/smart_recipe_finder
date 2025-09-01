import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Viewrecipe.css";

const RecipeDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingLoading, setRatingLoading] = useState(false);
  const [favLoading, setFavLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recipes/${id}`);
        setRecipe(res.data);
        // determine if current user has favorited this recipe
        try {
          const stored = JSON.parse(localStorage.getItem('user'));
          const uid = stored && (stored._id || stored.userId || stored);
          if (uid && res.data && Array.isArray(res.data.favoritedBy)) {
            setIsFavorite(res.data.favoritedBy.map(x => String(x)).includes(String(uid)));
          }
        } catch (e) {
          // ignore parse errors
        }
      } catch (err) {
        setError("Failed to load recipe.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  const handleRate = async (rating) => {
    setRatingLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/recipes/${id}/rate`, { rating });
      setSelectedRating(rating);
      alert("Thanks for rating!");
    } catch (err) {
      alert("Failed to submit rating.");
    } finally {
      setRatingLoading(false);
    }
  };

  const handleFavorite = async () => {
    setFavLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `http://localhost:5000/api/recipes/favorite/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data && typeof res.data.favorited !== 'undefined') {
        setIsFavorite(Boolean(res.data.favorited));
        alert(res.data.favorited ? 'Recipe added to favorites!' : 'Recipe removed from favorites');
      } else {
        // fallback: toggle
        setIsFavorite(prev => !prev);
        alert('Favorite toggled');
      }
    } catch (err) {
      alert("Failed to add to favorites.");
    } finally {
      setFavLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!recipe) return <div>Recipe not found.</div>;

  return (
    <div className="recipe-container">
      <div className="recipe-header">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        <button className={`fav-btn ${isFavorite ? 'favorited' : ''}`} onClick={handleFavorite} disabled={favLoading}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 24 24">
            <path d="M6 2a2 2 0 0 0-2 2v18l8-5.333L20 22V4a2 2 0 0 0-2-2H6zm0 2h12v15.333l-6-4-6 4V4z"/>
          </svg>
          {favLoading ? (isFavorite ? 'Removing...' : 'Adding...') : (isFavorite ? 'Remove Favorite' : 'Add to Favorites')}
        </button>
      </div>

      <div className="recipe-image">
        <img src={recipe.image || "/spaghetti.png"} alt={recipe.name} />
      </div>

      <div className="recipe-title">
        <h1>{recipe.name}</h1>
        <div className="meta">
          <span>🕒 {recipe.cookingTime}</span>
          <span>⭐ {recipe.rating || "N/A"}</span>
        </div>
      </div>

      <div className="section">
        <h2>Ingredients</h2>
        <ul>
          {recipe.ingredients && recipe.ingredients.split(',').map((ing, i) => (
            <li key={i}>{ing.trim()}</li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h2>Steps</h2>
        <ol>
          {recipe.instructions && recipe.instructions.split('.').map((step, i) => step.trim() && (
            <li key={i}>{step.trim()}</li>
          ))}
        </ol>
      </div>

      <div className="action-buttons">
        <button className="share-btn" onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: recipe.name,
              text: `Check out this recipe: ${recipe.name}\n\nIngredients: ${recipe.ingredients}\n\nInstructions: ${recipe.instructions}`,
              url: window.location.href
            });
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Recipe link copied to clipboard!');
          }
        }}>Share</button>
        <div className="rating-stars">
          {[1,2,3,4,5].map(star => (
            <span
              key={star}
              style={{
                cursor: ratingLoading ? "not-allowed" : "pointer",
                color: selectedRating >= star ? "#FFD700" : "#ccc",
                fontSize: "2rem",
                marginRight: "4px"
              }}
              onClick={() => !ratingLoading && handleRate(star)}
            >★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
