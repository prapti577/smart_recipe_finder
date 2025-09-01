import React from "react";
import "./SearchedRecipes.css";

const SearchedRecipes = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <img src="/logo.png" alt="Logo" />
          <span>Smart Recipe Finder</span>
        </div>
        <div className="nav-links">
          <a href="#">Home</a>
          <a href="#">Popular</a>
          <button className="get-started">Get Started</button>
        </div>
      </nav>

      <main>
        <h1>Find Recipes With What You Have</h1>

        <div className="search-bar">
          <input type="text" placeholder="e.g Chicken, tomato, pasta" />
          <button className="add-btn">Add Ingredients</button>
        </div>

        <div className="card-container">
          {[
            { title: "Spaghetti", time: "30 min", rating: "4.6", image: "/spaghetti.png" },
            { title: "Salad", time: "20 min", rating: "4.6", image: "/salad.png" },
            { title: "Soup", time: "10 min", rating: "4.6", image: "/soup.png" }
          ].map((recipe, index) => (
            <div className="card" key={index}>
              <img src={recipe.image} alt={recipe.title} />
              <h3>{recipe.title}</h3>
              <p>⏱️ {recipe.time}<br />⭐ {recipe.rating}</p>
              <button>View Recipe ›</button>
            </div>
          ))}
        </div>

        <div className="search-result">
          <h2>Result for : Chicken, Tomato, Pasta</h2>
          <div className="summary">
            <div>
              <h3>Spaghetti</h3>
              <p>⏱️ 30 min<br />⭐ 4.6</p>
            </div>
            <div>
              <h3>Soup</h3>
              <p>⏱️ 10 min<br />⭐ 4.6</p>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Privacy Policy</a>
      </footer>
    </div>
  );
};

export default SearchedRecipes;
