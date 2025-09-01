import React, { useState, useEffect } from "react";
import API from './api';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import "./Browse.css";
import Search from './Search';
import Card from './Card';

export default function Browse() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // shuffle helper
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);

      const startTime = Date.now(); // track start time
      try {
        let res;
        if (ingredients && ingredients.trim() !== '') {
          const res = await API.get(`/api/recipes?q=${encodeURIComponent(ingredients.trim())}`);

          setRecipes(res.data || []);
        } else {
          res = await API.get('/api/recipes');
          setRecipes(shuffle(res.data || []));
        }
        setError(null);
      } catch (err) {
        setError('Failed to load recipes.');
        setRecipes([]);
      } finally {
        // ensure loading stays at least 500ms
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(500 - elapsed, 0);
        setTimeout(() => setLoading(false), remaining);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  const generateRecipe = async () => {
    setLoading(true);

    const startTime = Date.now();
    try {
      const res = await API.post('/api/recipe', { ingredients });
      setRecipes([res.data.recipe]);
      setError(null);
    } catch (err) {
      console.log('Error generating recipe');
    } finally {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(500 - elapsed, 0);
      setTimeout(() => setLoading(false), remaining);
    }
  };

  return (
    <div className="browse-container">
      <Navbar />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Browse Recipes</h1>
      <Search setIngredients={setIngredients} generateRecipe={generateRecipe} />

      <div className="browse-grid">
        {loading ? (
          <div className="loading-icon">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div>{error}</div>
        ) : recipes.length === 0 ? (
          <div>No recipes found.</div>
        ) : (
          recipes.map((recipe, index) => (
            <Card key={recipe._id || index} recipe={recipe} />
          ))
        )}
      </div>
      <footer className='footer_login'>
        <a href="" onClick={() => navigate("/about")}>About</a>
        <a href="" onClick={() => navigate("/contact")}>Contact</a>
        <a href="" onClick={() => navigate("/privacypolicy")}>Privacy Policy</a>
      </footer>
    </div>
  );
}
