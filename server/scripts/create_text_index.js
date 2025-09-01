const mongoose = require('mongoose');
const Recipe = require('../Models/recipeModel');
require('dotenv').config();

async function createIndex() {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to MongoDB, creating text index...');
    await Recipe.collection.createIndex({ name: 'text', ingredients: 'text', taste: 'text' }, { default_language: 'english' });
    console.log('Text index created on name, ingredients, taste');
    process.exit(0);
  } catch (err) {
    console.error('Failed to create text index', err);
    process.exit(1);
  }
}

createIndex();
