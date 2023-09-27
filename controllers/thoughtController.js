const { Thought, User } = require("../models");

const thoughtController = {
  // Get all Thoughts
  async getAllThoughts(req, res) {
    try {
      // Find all thoughts, populate reactions, select fields to include/exclude, and sort by ID
      const thoughtData = await Thought.find({})
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });

      // Send the thought data as a JSON response
      res.json(thoughtData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Get one Thought by id
  async getThoughtById({ params }, res) {
    try {
      // Find a single thought by ID, populate reactions, select fields to include/exclude, and sort by ID
      const thoughtData = await Thought.findOne({ _id: params.id })
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: "Could not find any thought with this id!" });
      }

      // Send the thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Create Thought
  // Push the created thought's _id to the associated user's thoughts array field
  async createThought({ params, body }, res) {
    try {
      // Create a new thought based on the request body
      const thought = await Thought.create(body);
      const thoughtId = thought._id;

      // Update the user's thoughts array with the new thought's ID
      const user = await User.findOneAndUpdate(
        { _id: body.userId },
        { $push: { thoughts: thoughtId } },
        { new: true }
      );

      // If no user is found, return a 404 status code
      if (!user) {
        return res
          .status(404)
          .json({ message: "Thought created but could not find any user with this id!" });
      }

      // Send a success message as a JSON response
      res.json({ message: "You have successfully created a thought!" });
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Update Thought by id
  async updateThought({ params, body }, res) {
    try {
      // Find and update a thought by its ID, validate, and return the updated thought
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        {
          new: true,
          runValidators: true,
        }
      );

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: "Could not find any thought with this id!" });
      }

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

// Delete Thought
async deleteThought({ params }, res) {
  try {
    // Find and delete a thought by its ID
    const thoughtData = await Thought.findOneAndDelete({ _id: params.id });

    // If no thought is found, return a 404 status code
    if (!thoughtData) {
      return res.status(404).json({ message: "Could not find any thought with this id!" });
    }

    // Update the user's thoughts array by removing the deleted thought's ID
    const userData = await User.findOneAndUpdate(
      { thoughts: params.id },
      { $pull: { thoughts: params.id } },
      { new: true }
    );

    // If no user is found, return a 404 status code
    if (!userData) {
      return res
        .status(404)
        .json({ message: "Thought deleted but could not find any user with this id!" });
    }

    // Send a success message as JSON response
    res.json({ message: "Thought and associated user data have been deleted!" });
  } catch (error) {
    console.error(error);
    res.sendStatus(400); // Send a 400 status code on error
  }
},

  // Add reaction
  async createReaction({ params, body }, res) {
    try {
      // Find the thought by ID and add a new reaction to it
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({
          path: "reactions",
          select: "-__v",
        })
        .select("-__v");

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: "Could not find any thought with this id!" });
      }

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Delete reaction
  async deleteReaction({ params }, res) {
    try {
      // Find the thought by ID and remove a reaction by its ID
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },
};

module.exports = thoughtController;
