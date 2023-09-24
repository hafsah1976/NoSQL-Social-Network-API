const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require('../../controllers/userController.js');
  
  // Users Routes
router
.route('/')
.get(getAllUsers)
.post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(deleteFriend);

  module.exports = router;