const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
    getAllFriends,
  } = require('../../controllers/userController.js');
  
  // Users Routes
router
.route('/')
.get(getAllUsers) //GET /api/users: Retrieves a list of all users.

.post(createUser);//POST /api/users: Creates a new user.


// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:id')
  .get(getUserById)//GET /api/users/:id: Retrieves a specific user by their ID.

  .put(updateUser)//PUT /api/users/:id: Updates a specific user by their ID.

  .delete(deleteUser);//DELETE /api/users/:id: Deletes a specific user by their ID.


router
.route('/:userId/friends/:friendId')
.post(addFriend)//POST /api/users/:userId/friends/:friendId: Adds a friend to a user's friends list.

.delete(deleteFriend);//DELETE /api/users/:userId/friends/:friendId: Deletes a friend from a user's friends list.


router
  .route('/:userId/friends')
  .get(getAllFriends);//GET /api/users/:userId/friends: Retrieves the list of friends for a specific user.


module.exports = router;
