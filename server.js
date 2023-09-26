// Import required libraries and modules
const express = require('express'); // Import Express.js
const db = require('./config/connection'); // Import database connection configuration
const routes = require('./routes'); // Import route handlers

// const cwd = process.cwd();

// Note: not necessary for the Express server to function. This just helps indicate what activity's server is running in the terminal.
// const activity = cwd.includes('NoSQL-Social-Network-API')
//   ? cwd.split('NoSQL-Social-Network-API')[1]
//   : cwd;

// Define the port for the server to listen on
const PORT = process.env.PORT || 3001;

// Create an Express application
const app = express();

// Middleware to parse incoming request bodies as JSON
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Use the defined routes for handling API endpoints
app.use(routes);

// Event handler for when the database connection is opened
db.once('open', () => {
  // Start the Express server and listen on the specified port
  app.listen(PORT, () => {
    console.log(`API server for Social Network API is now running on port ${PORT}!`);
  });
});
