const { User, Thought } = require("../models");

const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      // Find all users, populate friends, select fields to include/exclude, and sort by ID
      const userData = await User.find({})
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v")
        .sort({ _id: -1 });
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Get one user by id
  async getUserById({ params }, res) {
    try {
      // Find a single user by ID, populate thoughts and friends, select fields to include/exclude
      const userData = await User.findOne({ _id: params.id })
        .populate({
          path: "thoughts",
          select: "-__v",
        })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");

      // If no user is found, return a 404 status code
      if (!userData) {
        return res
          .status(404)
          .json({ message: "Could not find any user with this id!" });
      }

      // Send the user data as JSON response
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Create user
  async createUser({ body }, res) {
    try {
      // Create a new user based on the request body
      const userData = await User.create(body);
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Update user by id
  async updateUser({ params, body }, res) {
    try {
      // Find and update a user by its ID, validate, and return the updated user
      const userData = await User.findOneAndUpdate({ _id: params.id }, body, {
        new: true,
        runValidators: true,
      });

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: "Could not find any user with this id!" });
      }

      // Send the updated user data as JSON response
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Delete user
  async deleteUser({ params }, res) {
    try {
      // Find and delete a user by its ID
      const userData = await User.findOneAndDelete({ _id: params.id });

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: "Could not find any user with this id!" });
      }

      // Use $in to find specific thoughts and delete them all
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });

      // Send a success message as JSON response
      res.json({ message: "User and associated were thoughts have been deleted!" });
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Add friend
  async addFriend({ params }, res) {
    try {
      // Find the user by ID and add a new friend to their friends array
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $addToSet: { friends: params.friendId } },
        { new: true, runValidators: true }
      );

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: "Could not find any user with this id!" });
      }

      // Send the updated user data as JSON response
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

  // Delete friend
  async deleteFriend({ params }, res) {
    try {
      // Find the user by ID and remove a friend from their friends array
      const userData = await User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
      );

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: "Could not find any user with this id!" });
      }

      // Send the updated user data as JSON response
      res.json(userData);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },
  
  // Get all friends of a user
  async getAllFriends({ params }, res) {
    try {
      // Find the user by ID and populate their friends list
      const userData = await User.findOne({ _id: params.userId })
        .populate({
          path: "friends",
          select: "-__v",
        })
        .select("-__v");

      // If no user is found, return a 404 status code
      if (!userData) {
        return res.status(404).json({ message: "No user with this id!" });
      }

      // Send the user's friends list as a JSON response
      res.json(userData.friends);
    } catch (error) {
      console.error(error);
      res.sendStatus(400); // Send a 400 status code on error
    }
  },

};

module.exports = userController;