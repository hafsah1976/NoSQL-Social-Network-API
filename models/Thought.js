const {Schema, model, Types} = require('mongoose');
const dateFormat = require('day.js');

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
    getters: true
  },
  id: false,
},
);

// Define a getter method for "createdAt" to format the timestamp on query
thoughtSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); // Customize the formatting as needed
});

// Creating a virtual field "reactionCount" to calculate the length of the "reactions" array
thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// Reaction Schema (for nested documents in reactions array)
const reactionSchema = new Schema (
  {
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
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
    //add date formate here
  }
},
{
  toJSON:{
    virtuals:true,
    getters:true
  },
  id:false
}
);


// Defining a getter method for "createdAt" to format the timestamp on query
reactionSchema.virtual('formattedCreatedAt').get(function () {
  return this.createdAt.toISOString(); 
});

const Thought = model('Thought', thoughtSchema);
 
module.exports = { Thought, Reaction };

