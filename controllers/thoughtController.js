const { User, Thought } = require('../models');  // Import the "Thought" and "User" models 
const mongoose = require ('mongoose');

const thoughtController  =  {
  // Get all thoughts
  async getAllThoughts(req, res)  {
    try {
      // Fetch all thoughts, populate reactions, select fields to include/exclude, and sort by ID
      const thoughtData = await Thought.find({})
        .populate({
          path: 'reactions',
          select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 });

      // Send the thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.sendStatus(400);
    }
  },

  // Get a single thought by its ID and populate reactions
  async getThoughtById({ params }, res) {
    try {
      // Find a single thought by ID, populate reactions, select fields to include/exclude, and sort by ID
      const thoughtData = await Thought.findOne({ _id: params.id })
        .populate({
          path: 'reactions',
          select: '-__v',
        })
        .select('-__v')
        .sort({ _id: -1 });

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: 'Could not find any thoughts with this id!' });
      }

      // Send the thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.sendStatus(400);
    }
  },

// Create a new thought
async createThought({ body }, res) { // Use the destructured body parameter
  try {
    // Create a new thought based on the request body
    const thoughtData = await Thought.create(body); // Use the destructured body parameter

    // Update the user's thoughts array with the new thought's ID
    const userData = await User.findOneAndUpdate(
      { userId: body.userId }, // Use the destructured body parameter
      { $push: { thoughts: thoughtData._id } },
      { new: true }
    );

    // If no user is found, return a 404 status code
    if (!userData) {
      return res.status(404).json({ message: 'Could not find any user with this id!' });
    }

    // Send the created thought data as JSON response
    res.json(thoughtData);
  } catch (error) {
    // Handle any errors and send a 400 status code on error
    console.error(error);
    res.sendStatus(400);
  }
},

  // Update a thought by its ID
  async updateThought({ params, body }, res) {
    try {
      // Find and update a thought by its ID, validate, and return the updated thought
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: 'Could not find any thoughts with this id!' });
      }

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.sendStatus(400);
    }
  },

  // Delete a thought by its ID
  async deleteThought({ params }, res) {
    try {
      // Find and delete a thought by its ID
      const thoughtData = await Thought.findOneAndDelete({ _id: params.id });

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: 'Could not find any thoughts with this id!' });
      }

      // Update the user's thoughts array by removing the deleted thought's ID
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { thoughts: params.id } },
        { new: true }
      );

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: 'Could not find any user with this id!' });
      }

      // Send the updated user data as JSON response
      res.json(userData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.sendStatus(400);
    }
  },

  // Create a reaction for a thought
  async createReaction({ params, body }, res) {
    try {
      // Find the thought by ID and add a new reaction to it
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $push: { reactions: body } },
        { new: true, runValidators: true }
      )
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v');

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: 'Could not find any thoughts with this id!' });
      }

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.status(400).json(error);
    }
  },

  // Delete a reaction by its ID
  async deleteReaction({ params }, res)  {
    try {
      // Find the thought by ID and remove a reaction by its ID
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: params.reactionId } } },
        { new: true }
      );

      // If no thought is found, return a 404 status code
      if (!thoughtData) {
        return res.status(404).json({ message: 'Could not find any thoughts with this id!' });
      }

      // Send the updated thought data as JSON response
      res.json(thoughtData);
    } catch (error) {
      // Handle any errors and send a 400 status code on error
      console.error(error);
      res.status(400).json(error);
    }
  }
};
module.exports = thoughtController;