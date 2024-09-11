const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY_s;  // Load API key from environment variables

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).send('Prompt is required');
  }

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo', //'gpt-4', 
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    // Send the response back to the client
    res.json({ message: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error connecting to OpenAI:', error.message);
    
    if (error.response) {
      // If OpenAI responded with an error
      console.error('OpenAI response error:', error.response.data);
      res.status(error.response.status).send(error.response.data);
    } else {
      // Generic error
      res.status(500).send('Internal Server Error');
    }
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
