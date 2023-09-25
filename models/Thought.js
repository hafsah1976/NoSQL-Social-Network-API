// Import necessary modules from Mongoose
const { Schema, model } = require('mongoose');

// Import the Reaction schema 
const reactionSchema = require('./Reaction');

// Define the Thought Schema
const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  username: {
    type: String,
    required: true,
  },
  reactions: [reactionSchema], // Array of nested reaction documents

  // // Define options for converting the document to JSON
  // toJSON: {
  //   virtuals: true, // Include virtual properties
  //   getters: true,  // Apply getters when converting to JSON
  // },
  // id: false, // Disable the inclusion of '_id' in the JSON output
});

// Define a getter method for "formattedCreatedAt" to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); // Customize the formatting
});

// Create a virtual field "reactionCount" to calculate the length of the "reactions" array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Create the Thought model using the schema
const Thought = model('Thought', thoughtSchema);

// Export the Thought model for use in other parts of the application
module.exports = Thought;