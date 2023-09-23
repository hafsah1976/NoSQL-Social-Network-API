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
  
  // Define a getter method for "createdAt" to format the timestamp on query
  reactionSchema.virtual('formattedCreatedAt').get(function () {
    return this.createdAt.toISOString(); // Customize the formatting as needed
  });


  