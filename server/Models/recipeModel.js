const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  cookingTime: { type: String, required: true },
  imageUrl: { type: String }, // 🔹 store Vercel Blob public URL
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  ratingTotal: { type: Number, default: 0 },
  favoritedBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Addnewrecipe', recipeSchema);
