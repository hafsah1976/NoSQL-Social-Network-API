const mongoose = require('mongoose');


// Thought Schema
const thoughtSchema = new mongoose.Schema({
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
  },
  id: false,
},
);

// Define a getter method for "createdAt" to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); // Customize the formatting as needed
});


// Reaction Schema (for nested documents in reactions array)
const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Creating a virtual field "reactionCount" to calculate the length of the "reactions" array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Defining a getter method for "createdAt" to format the timestamp on query
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); 
});

const Thought = mongoose.model('Thought', thoughtSchema);
const Reaction = mongoose.model('Reaction', reactionSchema);
 
module.exports = { Thought, Reaction };

