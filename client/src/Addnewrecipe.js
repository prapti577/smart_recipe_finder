import React, { useState } from 'react';
import API from './api';
import './Addnewrecipe.css';

const AddRecipePage = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Upload image to backend (Vercel Blob)
  const handleImageUpload = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("profilePic", file);

    try {
      const res = await API.post("/api/upload/profile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please wait until the image finishes uploading!");
      return;
    }

    try {
      await API.post(
        "/api/recipes/add",
        { name, ingredients, instructions, cookingTime, imageUrl },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Recipe added successfully!");
      setName("");
      setIngredients("");
      setInstructions("");
      setCookingTime("");
      setImage(null);
      setImageUrl("");
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Recipe name"
          required
        />

        <label>Ingredients</label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="List ingredients"
          required
        />

        <label>Instructions</label>
        <input
          type="text"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Write instructions"
          required
        />

        <label>Cooking Time</label>
        <input
          type="text"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
          placeholder="e.g. 30 min"
          required
        />

        <label>Upload Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
            handleImageUpload(e.target.files[0]);
          }}
        />
        {uploading && <p>Uploading image...</p>}
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Recipe Preview"
            style={{ width: "120px", marginTop: "10px" }}
          />
        )}

        <button type="submit" className="submit-btn" disabled={uploading}>
          {uploading ? "Uploading Image..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
};

export default AddRecipePage;
