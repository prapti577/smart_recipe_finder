import React from "react";
import "./Searchresult.css";
import Navbar from './Navbar';

const SearchResults = () => {
  return (
    <div className="result-container-main">
      <Navbar />
    
    <div className="result-container">
      
      <h1>Find Recipes With What You Have</h1>

      <div className="search-bar">
        <input type="text" placeholder="e.g Chicken, tomato, pasta" />
        <button className="add-btn">Add Ingredients</button>
      </div>

      <div className="recipe-grid">
        {["Spaghetti", "Salad", "Soup"].map((item, index) => (
          <div className="recipe-card" key={index}>
            <img src={`/${item.toLowerCase()}.png`} alt={item} />
            <h3>{item}</h3>
            <div className="recipe-meta">
              <span>🕒 {item === "Spaghetti" ? "30 min" : item === "Salad" ? "20 min" : "10 min"}</span>
              <span>⭐ 4.6</span>
            </div>
            <button className="view-btn">View Recipe</button>
          </div>
        ))}
      </div>

      <div className="results">
        <h2>Result for : Chicken, Tomato, Pasta</h2>
        <div className="result-list">
          <div className="result-card">
            <h3>Spaghetti</h3>
            <p>🕒 30 min</p>
            <p>⭐ 4.6</p>
          </div>
          <div className="result-card">
            <h3>Soup</h3>
            <p>🕒 10 min</p>
            <p>⭐ 4.6</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <span>About</span>
        <span>Contact</span>
        <span>Privacy Policy</span>
      </footer>
    </div>
    </div>
  );
};

export default SearchResults;
