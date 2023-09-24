// Import required libraries and modules
const express = require('express'); // Import Express.js
const db = require('./config/connection'); // Import database connection configuration
const routes = require('./routes'); // Import route handlers

// Get the current working directory (CWD)
const cwd = process.cwd();

// Define the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Determine the current activity based on the directory name (optional, for display purposes)
const activity = cwd.includes('NoSQL-Social-Network-API')
  ? cwd.split('NoSQL-Social-Network-API')[1]
  : cwd;

// Middleware to parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Use the defined routes for handling API endpoints
app.use(routes);

// Event handler for when the database connection is opened
db.once('open', () => {
  // Start the Express server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server for ${activity} running on port ${PORT}!`);
  });
});
