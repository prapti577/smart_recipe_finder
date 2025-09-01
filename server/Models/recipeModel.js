const mongoose = require('mongoose');


const recipeSchema = new mongoose.Schema({
    name: String,
    ingredients: String,
    instructions: String,
    cookingTime: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: { type: Number, default: 0 },
    ratingCount: { type: Number, default: 0 },
    ratingTotal: { type: Number, default: 0 },
    favoritedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }] // <-- Add this line
}, {
    timestamps: true
});

module.exports = mongoose.model('Addnewrecipe', recipeSchema);