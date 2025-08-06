import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());

const API_KEY = 'OjwJ62YWj7gveE0OkmkrCvRM4U3Omh16';
const START_DATE = '2025-07-23'; // or make dynamic
const END_DATE = '2025-08-22';

app.get('/leaderboard/top14', async (req, res) => {
  try {
    const url = `https://services.rainbet.com/v1/external/affiliates?start_at=${START_DATE}&end_at=${END_DATE}&key=${API_KEY}`;
    const response = await axios.get(url);
    const raw = response.data || [];

    const sorted = raw
      .sort((a, b) => b.wagered - a.wagered)
      .slice(0, 14)
      .map(p => ({
        username: p.username,
        wagered: p.wagered
      }));

    res.json(sorted);
  } catch (err) {
    console.error('Error fetching leaderboard:', err.message);
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
