const {Schema, model} = require('mongoose');
//add date format require() here

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    
  },
  thoughts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thought', // Reference to the Thought model
    },
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User', // Self-reference to the User model
    },
  ]
},
{
  toJSON:{
    virtuals:true
  },
}
);

// Create a virtual field "friendCount" to calculate the length of the "friends" array
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;
