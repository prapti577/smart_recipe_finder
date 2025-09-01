import React, { useEffect, useState } from "react";
import API from "./api";
import Card from "./Card";
import "./Myrecipe.css";

export default function MyRecipe() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/api/recipes/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setRecipes(res.data);
      } catch (err) {
        setError("Failed to fetch recipes.");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="favorites-container">
      <div className="recipe-header">
        <button className="back-btn" onClick={() => window.history.back()}>←</button>
        <h1 className="favorites-title">My Recipe</h1>
      </div>
      <div className="favorites-grid">
        {recipes.length === 0 ? (
          <div>No recipes found.</div>
        ) : (
          recipes.map((recipe) => <Card key={recipe._id} recipe={recipe} />)
        )}
      </div>
    </div>
  );
}