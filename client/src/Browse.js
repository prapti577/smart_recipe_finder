import React, { useState, useEffect } from "react";
import axios from 'axios';
import Navbar from './Navbar';
import "./Browse.css";
import Search from './Search';
import Card from './Card';

export default function Browse() {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // shuffle helper
  const shuffle = (arr) => {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // When there's no search ingredients, fetch all recipes and show in random order
  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        if (ingredients && ingredients.trim() !== '') {
          // search endpoint with query param
          const res = await axios.get(`http://localhost:5000/api/recipes?q=${encodeURIComponent(ingredients.trim())}`);
          setRecipes(res.data || []);
        } else {
          const res = await axios.get('http://localhost:5000/api/recipes');
          setRecipes(shuffle(res.data || []));
        }
        setError(null);
      } catch (err) {
        setError('Failed to load recipes.');
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [ingredients]);

  const generateRecipe = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/recipe', {
        ingredients
      });
      setRecipes([res.data.recipe]);
      setError(null);
    } catch (err) {
      setError('Error generating recipe');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="browse-container">
      <Navbar />
      <h1 style={{ textAlign: 'center', marginTop: '2rem' }}>Browse Recipes</h1>
      <Search setIngredients={setIngredients} generateRecipe={generateRecipe} />
      <div className="browse-grid">
        {loading ? (
          <div>Loading...</div>
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
    </div>
  );
}
