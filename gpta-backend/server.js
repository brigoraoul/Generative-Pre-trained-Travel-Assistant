const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = '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';  // Replace with your OpenAI API key

app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',  // or 'gpt-3.5-turbo'
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error connecting to OpenAI');
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
