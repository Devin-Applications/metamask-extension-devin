const express = require('express');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Initialize SQLite database
const db = new sqlite3.Database(path.join(__dirname, 'icon_mappings.db'));

// Define a route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// API endpoint to retrieve icon mappings
app.get('/api/mappings', (req, res) => {
  db.all('SELECT * FROM icon_mappings', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// API endpoint to update icon mappings
app.post('/api/mappings', (req, res) => {
  const { metamask_icon_name, fontawesome_icon_name } = req.body;
  const query = `
    INSERT INTO icon_mappings (metamask_icon_name, fontawesome_icon_name)
    VALUES (?, ?)
    ON CONFLICT(metamask_icon_name) DO UPDATE SET
      fontawesome_icon_name = excluded.fontawesome_icon_name
  `;
  const params = [metamask_icon_name, fontawesome_icon_name];
  db.run(query, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ message: 'Mapping updated successfully', data: { metamask_icon_name, fontawesome_icon_name } });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
