import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Search.css';

const Search = ({ setIngredients, generateRecipe }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const deb = useRef(null);

  // Initialize from location.state or localStorage
  const initialInput =
    location.state?.searchText ||
    localStorage.getItem('searchText') ||
    '';
  const [input, setInput] = useState(initialInput);

  // Update ingredients with debounce
  useEffect(() => {
    if (deb.current) clearTimeout(deb.current);
    deb.current = setTimeout(() => setIngredients(input), 300);
    return () => deb.current && clearTimeout(deb.current);
  }, [input, setIngredients]);

  // Save input to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('searchText', input);
  }, [input]);

  const handleInput = (val) => setInput(val);

  const handleSearch = () => {
    setIngredients(input);
    if (location.pathname === '/' || location.pathname === '') {
      navigate('/browse', { state: { searchText: input } });
    }
    if (generateRecipe) generateRecipe();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="search-container-home">
      <input
        type="text"
        placeholder="Search recipes by name, ingredient, or taste…"
        value={input}
        onChange={e => handleInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="button" className="search-icon-home" onClick={handleSearch}>
        🔍
      </button>
    </div>
  );
};

export default Search;
