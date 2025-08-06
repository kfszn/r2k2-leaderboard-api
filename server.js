const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const API_KEY = 'OjwJ62YWj7gveE0OkmkrCvRM4U3Omh16'; // your Rainbet key
const START_DATE = '2025-07-23';
const END_DATE = '2025-08-06';

app.get('/', (req, res) => {
  res.send('Leaderboard API is live!');
});

app.get('/leaderboard/top14', async (req, res) => {
  try {
    const response = await fetch(`https://services.rainbet.com/v1/external/affiliates?start_at=${START_DATE}&end_at=${END_DATE}&key=${API_KEY}`);
    const data = await response.json();

    const filtered = data.data
      .filter(user => user.username && user.wagered)
      .sort((a, b) => b.wagered - a.wagered)
      .slice(0, 14)
      .map(user => ({
        username: user.username,
        wagered: user.wagered.toFixed(2)
      }));

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
