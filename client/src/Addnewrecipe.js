import React, { useState } from 'react';
import axios from 'axios';
import './Addnewrecipe.css';

const AddRecipePage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/recipes/add",
        { name, ingredients, instructions, cookingTime },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      alert("Recipe added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add recipe.");
    }
  };

  return (
    <div className="add-recipe-container">
      <h2 className="add-recipe-title">Add New Recipe</h2>
      <form className="add-recipe-form" onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe name"
          required
        />

        <label>Ingredients</label>
        <textarea
          name="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List ingredients"
          required
        />

        <label>Instructions</label>
        <input
          type="text"
          name="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Write instructions"
          required
        />

        <label>Cooking Time</label>
        <input
          type="text"
          name="cookingTime"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          placeholder="e.g. 30 min"
          required
        />

        <button type="submit" className="submit-btn">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipePage;
