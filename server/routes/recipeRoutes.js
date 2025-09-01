const express = require("express");
const router = express.Router();
const Recipe = require("../Models/recipeModel");
const authenticateToken = require("../middleware/authenticateToken");
const mongoose = require('mongoose');

// Add new recipe (protected)
router.post("/add", authenticateToken, async (req, res) => {
  try {
    const { name, ingredients, instructions, cookingTime } = req.body;
    const user = req.user && req.user.userId;
    if (!user) return res.status(401).json({ error: "User not found in token" });
    const recipe = new Recipe({ name, ingredients, instructions, cookingTime, user });
    await recipe.save();
    res.status(201).json({ message: "Recipe added!", recipe });
  } catch (err) {
    res.status(500).json({ error: "Failed to add recipe." });
  }
});

// Get all recipes
router.get('/', async (req, res) => {
  try {
    const q = req.query.q || req.query.search;
    // If a search query is provided, perform a case-insensitive substring match
    if (q && String(q).trim() !== '') {
      // prefer MongoDB text search if a text index exists
      try {
        const indexes = await Recipe.collection.indexes();
        const hasText = indexes.some(ix => Object.values(ix.key).some(v => v === 'text'));
        if (hasText) {
          const recipes = await Recipe.find({ $text: { $search: q } }, { score: { $meta: 'textScore' } }).sort({ score: { $meta: 'textScore' } });
          return res.status(200).json(recipes);
        }
      } catch (indexErr) {
        // ignore and fallback to regex
        console.warn('Text index check failed, falling back to regex search', indexErr);
      }

      // fallback: escape regex special chars
      const escaped = String(q).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(escaped, 'i');
      const recipes = await Recipe.find({
        $or: [
          { name: regex },
          { ingredients: regex },
          { taste: regex }
        ]
      });
      return res.status(200).json(recipes);
    }

    const recipes = await Recipe.find({});
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

// Get recipes for the logged-in user
router.get('/my', authenticateToken, async (req, res) => {
  try {
    const user = req.user && req.user.userId;
    if (!user) return res.status(401).json({ error: "User not found in token" });
    const recipes = await Recipe.find({ user });
    res.status(200).json(recipes);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch recipes." });
  }
});

router.post("/:id/rate", async (req, res) => {
  const { rating } = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    recipe.ratingCount += 1;
    recipe.ratingTotal += rating;
    recipe.rating = recipe.ratingTotal / recipe.ratingCount;
    await recipe.save();
    res.json({ success: true, rating: recipe.rating });
  } catch (err) {
    res.status(500).json({ error: "Failed to rate recipe" });
  }
});

router.post("/favorite/:id", authenticateToken, async (req, res) => {
  try {
    const user = req.user && req.user.userId;
    if (!user) return res.status(401).json({ error: "User not found in token" });
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: "Recipe not found" });
    const userIdStr = String(user);
    const isFavorited = recipe.favoritedBy.map(id => String(id)).includes(userIdStr);
    if (isFavorited) {
      // remove favorite
      recipe.favoritedBy = recipe.favoritedBy.filter(id => String(id) !== userIdStr);
      await recipe.save();
      return res.json({ success: true, favorited: false, message: 'Recipe unfavorited' });
    } else {
      // add favorite
      recipe.favoritedBy.push(user);
      await recipe.save();
      return res.json({ success: true, favorited: true, message: 'Recipe favorited' });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to favorite recipe" });
  }
});

// Get all favorite recipes for the logged-in user
router.get('/favorites', authenticateToken, async (req, res) => {
  try {
    const user = req.user && req.user.userId;
    if (!user) return res.status(401).json({ error: "User not found in token" });

    // Validate user ID format and construct ObjectId safely
    if (!mongoose.Types.ObjectId.isValid(user)) {
      // don't throw; return empty list for invalid user id
      console.warn('Favorites: invalid user id', user);
      return res.status(200).json([]);
    }

    const userObjectId = new mongoose.Types.ObjectId(user);

    // Find recipes where favoritedBy contains the user ObjectId
    const recipes = await Recipe.find({
      favoritedBy: userObjectId
    });

  // debug logs removed

    res.status(200).json(recipes);
  } catch (err) {
    console.error("Favorites error:", err);
    res.status(500).json({ error: "Failed to fetch favorite recipes." });
  }
});

// Get recipe by ID (placed after static routes like /favorites so 'favorites' isn't treated as an :id)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.status(200).json(recipe);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipe.' });
  }
});

module.exports = router;