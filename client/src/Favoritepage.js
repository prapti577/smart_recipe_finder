import React from "react";
import "./Favoritepage.css";

const favoritesData = [
  {
    name: "Spaghetti",
    time: "30 min",
    rating: 4.6,
    image: "https://cdn-icons-png.flaticon.com/512/857/857681.png"
  },
  {
    name: "Soup",
    time: "10 min",
    rating: 4.6,
    image: "https://cdn-icons-png.flaticon.com/512/2927/2927743.png"
  },
  {
    name: "Salad",
    time: "20 min",
    rating: 4.6,
    image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
  },
  {
    name: "Omelette",
    time: "10 min",
    rating: 4.6,
    image: "https://cdn-icons-png.flaticon.com/512/201/201819.png"
  }
];

export default function Favorites() {
  return (
    <div className="favorites-container">
      <h1>Favorites</h1>
      <div className="favorites-grid">
        {favoritesData.map((item, index) => (
          <div className="recipe-card" key={index}>
            <img src={item.image} alt={item.name} className="recipe-img" />
            <h3>{item.name}</h3>
            <div className="recipe-info">
              <span>⏱ {item.time}</span>
              <span>⭐ {item.rating}</span>
            </div>
            <button className="view-btn">View Recipe ›</button>
          </div>
        ))}
      </div>
    </div>
  );
}
