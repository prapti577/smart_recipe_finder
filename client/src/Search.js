import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';
const Search = ({ setIngredients, generateRecipe }) => {
  const [input, setInput] = useState('');
  const deb = useRef(null);
  useEffect(() => {
    // debounce input -> setIngredients
    if (deb.current) clearTimeout(deb.current);
    deb.current = setTimeout(() => setIngredients(input), 300);
    return () => deb.current && clearTimeout(deb.current);
  }, [input, setIngredients]);
  const handleInput = (val) => {
    setInput(val);
  };
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    setIngredients(input);
    // if user is on home page, redirect to browse
    if (location && (location.pathname === '/' || location.pathname === '')) {
      navigate('/browse');
    }
  };

  return (
    <div className="search-container-home">
      <input
        type="text"
        placeholder="Search recipes by name, ingredient, or taste…"
        value={input}
        onChange={e => handleInput(e.target.value)}
      />
      <button type="button" className="search-icon-home" onClick={handleSearchClick}>🔍</button>
    </div>
  );
};
export default Search;
// This component allows users to input ingredients and search for recipes based on those ingredients.