const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Thought Schema
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

  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
});

// Define a getter method for "createdAt" to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); // Customize the formatting as needed
});

// Create a virtual field "reactionCount" to calculate the length of the "reactions" array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
