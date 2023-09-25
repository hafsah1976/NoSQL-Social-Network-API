// Import the Mongoose library
const mongoose = require('mongoose');

// Connect to the MongoDB database using the provided URI or a default one
mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost/NoSQL-Social-Network-API',
  {
    useNewUrlParser: true,         // Use the new URL parser
    useUnifiedTopology: true,      // Use the new Server Discovery and Monitoring engine
  }
);

// Enable Mongoose debugging to log MongoDB queries and operations
mongoose.set('debug', true);

// Get the default connection to the database
const dbConnection = mongoose.connection;

// Event handler for database connection errors
dbConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Event handler for a successful database connection
dbConnection.once('open', () => {
  console.log('MongoDB connected.');
});

// Export the database connection for use in other parts of the application
module.exports = dbConnection;
