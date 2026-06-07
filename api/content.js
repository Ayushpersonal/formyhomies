const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const jsonPath = path.join(process.cwd(), 'backend', 'data', 'content.json');
    const data = fs.readFileSync(jsonPath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } catch (error) {
    console.error('Error serving content:', error);
    res.status(500).json({ error: 'Failed to read content data' });
  }
};
