const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Logging for debugging
console.log('Starting server...');
console.log('Current directory:', __dirname);

// Check if build folder exists and log contents
const buildPath = path.join(__dirname, 'build');
console.log(`Checking for build folder at: ${buildPath}`);
if (fs.existsSync(buildPath)) {
  console.log('Build folder exists with files:', fs.readdirSync(buildPath));
} else {
  console.log('WARNING: Build folder not found!');
}

// Serve static files from the build folder using absolute path
app.use(express.static(path.join(__dirname, 'build')));

// For any request that doesn't match a static file, send the index.html
app.get('*', (req, res) => {
  console.log(`Request for: ${req.url}`);
  const indexPath = path.join(__dirname, 'build', 'index.html');
  
  if (fs.existsSync(indexPath)) {
    console.log('Serving index.html');
    res.sendFile(indexPath);
  } else {
    console.error('index.html not found at path:', indexPath);
    res.status(404).send('Build folder or index.html not found. Make sure your build is in the correct location.');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});