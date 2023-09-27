const router = require('express').Router();

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController.js');

// Thoughts Routes
router
  .route('/')
  .get(getAllThoughts) //GET /api/thoughts: Retrieves a list of all thoughts.
  .post(createThought);//POST /api/thoughts: Creates a new thought.

router
  .route('/:id')
  .get(getThoughtById)//GET /api/thoughts/:id: Retrieves a specific thought by its ID.
  .put(updateThought)//PUT /api/thoughts/:id: Updates a specific thought by its ID.
  .delete(deleteThought);//DELETE /api/thoughts/:id: Deletes a specific thought by its ID.

// Reactions Routes
router
  .route('/:thoughtId/reactions')
  .post(createReaction);//POST /api/thoughts/:thoughtId/reactions: Adds a new reaction to a specific thought.

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(deleteReaction);//DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Deletes a specific reaction from a specific thought.

module.exports = router;
