const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { OpenAI } = require('openai');
const path = require('path');

dotenv.config();
const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");
const uploadRoutes = require('./routes/uploadRoutes');
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, 
{ 
  useNewUrlParser: true,
  useUnifiedTopology: true 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

app.post('/api/recipe', async (req, res) => {
  const { ingredients } = req.body;
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: 'You are a creative chef who suggests recipes based on ingredients.'
        },
        {
          role: 'user',
          content: `Generate a recipe using these ingredients: ${ingredients}`
        }
      ]
    });
    res.json({ recipe: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate recipe.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Server process id (PID):', process.pid);
});