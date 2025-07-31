// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const { addResults, getResults } = require('./resultsStore');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());

// External API Endpoint
const SOURCE_URL = 'https://draw.ar-lottery01.com/WinGo/WinGo_1M/GetHistoryIssuePage.json';

// Fetch and store data
async function fetchAndStoreResults() {
  try {
    const response = await fetch(SOURCE_URL);
    if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

    const data = await response.json();
    const list = data?.data?.list || [];

    addResults(list);
    console.log(`[${new Date().toISOString()}] Fetched ${list.length} records.`);
  } catch (err) {
    console.error('Error fetching data:', err.message);
  }
}

// ⏱️ Auto-fetch every 60 seconds
setInterval(fetchAndStoreResults, 60 * 1000);

// First fetch immediately
fetchAndStoreResults();

// 🚀 Endpoint to get 1440 results
app.get('/api/results', (req, res) => {
  res.json(getResults());
});

// 🚀 Manual fetch endpoint
app.get('/fetch-now', async (req, res) => {
  await fetchAndStoreResults();
  res.json({ message: 'Manual fetch completed' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});