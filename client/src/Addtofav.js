import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Card from "./Card";
import "./Addtofav.css";

export default function Favorites() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch favorite recipes from backend
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No token found");
        
        const res = await axios.get('http://localhost:5000/api/recipes/favorites', {
          headers: { Authorization: `Bearer ${token}` }
        });
  // fetched favorites
        setRecipes(res.data);
      } catch (err) {
        setError(err.message || "Failed to fetch favorites");
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFavorites();
  }, []);

  const handleAddClick = () => {
    navigate('/addrecipe');
  };

  if (loading) {
    return <div className="favorite-page">Loading...</div>;
  }

  if (error) {
    return <div className="favorite-page">Error: {error}</div>;
  }

  if (recipes.length === 0) {
    return (
      <div className="favorite-page" style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#edb491' }}>
        <img src="your_icon.png" alt="Cooking Icon" style={{ width: '80px', marginBottom: '20px' }} />
        <h2>Add your favorite recipes to save them here</h2>
        <p>Save recipes for quick access any time</p>
        <div className="no-favorites">
          No favorite recipes yet.
        </div>
        <button className="browse-btn" onClick={() => navigate('/browse')}>Browse Recipes</button>
        <footer className="fav-footer"></footer>
      </div>
    );
  } else {
    return (
      <div className="favorites-container">
        <div className="recipe-header">
          <button className="back-btn" onClick={() => window.history.back()}>←</button>
          <h1 className="favorites-title">Favorites</h1>
        </div>
        <div className="recipes-grid">
          {recipes.map((recipe, index) => (
            <Card key={recipe._id || index} recipe={recipe} />
          ))}
        </div>
        <button className="browse-btn" onClick={() => navigate('/browse')}>Browse Recipes</button>
        <footer className="fav-footer"></footer>
      </div>
    );
  }
}

