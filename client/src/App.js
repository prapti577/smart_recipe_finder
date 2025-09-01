import React, { useState, useEffect } from 'react';
import API from './api';
import Navbar from './Navbar';
import Card from './Card';
import Search from './Search';


function App() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [popularRecipes, setPopularRecipes] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const fetchPopularRecipes = async () => {
      try {
        const res = await API.get('/api/recipes'); // Adjust endpoint as needed
        // Shuffle recipes randomly
        const shuffled = res.data.sort(() => 0.5 - Math.random());
        setPopularRecipes(shuffled);
      } catch (err) {
        setPopularRecipes([]);
      }
    };
    fetchPopularRecipes();
  }, []);

  // Auto-slide every 3 seconds
  useEffect(() => {
    if (popularRecipes.length <= 4) return;
    const interval = setInterval(() => {
      setSlideIndex(prev => (prev + 4) % popularRecipes.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [popularRecipes]);

  const generateRecipe = async () => {
    try {
      const res = await API.post('/api/recipe', {
        ingredients
      });
      setRecipe(res.data.recipe);
    } catch (err) {
      console.log('Error generating recipe');
    }
  };

  // Get 4 recipes for current slide
  const visibleRecipes = popularRecipes.slice(slideIndex, slideIndex + 4);
  // If at end, wrap around
  if (visibleRecipes.length < 4 && popularRecipes.length > 0) {
    visibleRecipes.push(...popularRecipes.slice(0, 4 - visibleRecipes.length));
  }

  return (
    <div style={{ padding: '2rem' }}>
      <Navbar />
      <main>
        <h2>Find Delicious Recipes With<br />What’s In Your Kitchen,</h2>
        <Search ingredients={ingredients} setIngredients={setIngredients} generateRecipe={generateRecipe} />
        <h3>Popular Recipes</h3>
        <div
          className="cards slide"
        >
          {visibleRecipes.map(recipe => (
            <Card key={recipe._id} recipe={recipe} />
          ))}
        </div>
      
      </main>
      <br />
      <pre>{recipe}</pre>
      <footer className='footer'>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default App;