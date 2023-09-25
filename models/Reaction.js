const { Schema, Types } = require('mongoose');


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
  // {
  //   toJSON:{
  //     virtuals:true,
  //     getters:true
  //   },
  //   id:false
  // }
  );

  module.exports = reactionSchema;
