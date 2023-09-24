// Import the required models
const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      // Use the User model to find all users, excluding '__v' field, and sort by '_id' in descending order
      const userData = await User.find({})
        .select('-__v')
        .sort({ _id: -1 });

      // Send the retrieved user data as a JSON response
      res.json(userData);
    } catch (error) {
      // If there's an error, log and send a 400 status
      console.error(error);
      res.sendStatus(400);
    }
  },

  // Get one user by id
  async getUserById({ params }, res) {
    try {
      // Use the 'User model' to find a user by their _id, populating their thoughts and friends fields
      const userData = await User.findOne({ _id: params.id })
        .populate({
          path: 'thoughts',
          select: '-__v',
        })
        .populate({
          path: 'friends',
          select: '-__v',
        });

      // If the user is not found, send a 404 status with an error message
      if (!userData) {
        res.status(404).json({ message: 'Could not find any user with this id!' });
        return;
      }

      // Send the retrieved user data as a JSON response
      res.json(userData);
    } catch (error) {
      // If there's an error, log it and send a Bad Request status
      console.error(error);
      res.sendStatus(400);
    }
  },

  // Create a new user
  async createUser({ body }, res) {
    try {
      // Use the User model to create a new user with the provided data
      const userData = await User.create(body);

      // Send the newly created user data as a JSON response
      res.json(userData);
    } catch (error) {
      // If there's an error, log it and send the error as a JSON response
      console.error(error);
      res.json(error);
    }
  },

  // Update user by id
  async updateUser({ params, body }, res) {
    try {
      // Use the User model to find and update a user by their _id, applying the provided data
      const userData = await User.findOneAndUpdate(
        { _id: params.id },
        body,
        { new: true, runValidators: true }
      );

      // If the user is not found, send a 404 status with an error message
      if (!userData) {
        res.status(404).json({ message: 'Could not find any user with this id!' });
        return;
      }

      // Send the updated user data as a JSON response
      res.json(userData);
    } catch (error) {
      // If there's an error, log it and send the error as a JSON response
      console.error(error);
      res.json(error);
    }
  },

  // Delete user and their associated thoughts
  async deleteUser({ params }, res) {
    try {
      // Delete all thoughts associated with the user identified by their _id
      await Thought.deleteMany({ userId: params.id });

      // Delete the user by their _id
      const userData = await User.findOneAndDelete({ _id: params.id });

      // If the user is not found, send a 404 status with an error message
      if (!userData) {
        res.status(404).json({ message: 'Could not find any user with this id!' });
        return;
      }

      // Send a JSON response indicating the user was deleted
      res.json(userData);
    } catch (error) {
      // If there's an error, log and send the error as a JSON response
      console.error(error);
      res.json(error);
    }
  },

  // Add a friend to a user's friend list
  async addFriend({ params }, res) {
    try {
      // Add the specified friend to the user's friends array
      const userFriendData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true }
      );

      // If the user is not found, send a 404 status with an error message
      if (!userFriendData) {
        res.status(404).json({ message: 'Could not find any user with this id!' });
        return;
      }

      // Send the updated user data as a JSON response
      res.json(userFriendData);
    } catch (error) {
      // If there's an error, log it and send the error as a JSON response
      console.error(error);
      res.status(400).json(error);
    }
  },

  // Delete a friend from a user's friend list
  async deleteFriend({ params }, res) {
    try {
      // Remove the specified friend from the user's friends array
      const userFriendData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );

      // If the user is not found, send a 404 status with an error message
      if (!userFriendData) {
        res.status(404).json({ message: 'Could not find any user with this id!' });
        return;
      }

      // Send the updated user data as a JSON response
      res.json(userFriendData);
    } catch (error) {
      // If there's an error, log and send the error as a JSON response
      console.error(error);
      res.status(400).json(error);
    }
  },
};
