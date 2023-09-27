const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dayjs = require('dayjs');

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280, // Changed to maxlength
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        // Use createdAt instead of formattedCreatedAt
        return dayjs(createdAt).format('MMM DD, YYYY [at] hh:mm a');
      },
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema); // Updated to PascalCase

module.exports = Thought;
