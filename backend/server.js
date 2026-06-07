import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// API Endpoint to fetch letter configurations and content data
app.get('/api/content', (req, res) => {
  const contentPath = path.join(__dirname, 'data', 'content.json');
  fs.readFile(contentPath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading content JSON:', err);
      return res.status(500).json({ error: 'Failed to read content data' });
    }
    res.json(JSON.parse(data));
  });
});

// Serve static assets from frontend if built in production environment
const frontendBuildPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendBuildPath)) {
  app.use(express.static(frontendBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendBuildPath, 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Kajol Bestie Web App Server is running. Frontend static build not found.');
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
