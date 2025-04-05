
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Serve static files from the build folder
app.use(express.static('build'));

// For any request that doesn't match a static file, send the index.html
app.use((req, res) => {
  const indexPath = path.resolve(__dirname, 'build', 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Build folder not found. Run npm run build first.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});