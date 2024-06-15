const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite database
const db = new sqlite3.Database('./iconMappings.db');

db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS icons (id INTEGER PRIMARY KEY, metamaskIcon TEXT, fontAwesomeIcon TEXT)');
});

// Endpoint to retrieve icon mappings
app.get('/icons', (req, res) => {
  db.all('SELECT * FROM icons', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ icons: rows });
  });
});

// Endpoint to update icon mappings
app.post('/icons', (req, res) => {
  const { metamaskIcon, fontAwesomeIcon } = req.body;
  db.run('INSERT INTO icons (metamaskIcon, fontAwesomeIcon) VALUES (?, ?)', [metamaskIcon, fontAwesomeIcon], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
