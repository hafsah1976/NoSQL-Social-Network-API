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
.route('/thoughts')
    .get(getAllThoughts)
    .post(createThought) //post new thought


router
.route("/thoughts/:thoughtId")
.get(getThoughtById) //thoughts by id
.put(updateThought) //update an existing thought
.delete(deleteThought); //delete a thought

    // Reactions Routes
router
.route('/thoughts/:thoughtId/reactions').post( createReaction) //post a reaction

.route('/thoughts/:thoughtId/reactions/:reactionId').delete(deleteReaction); //delete a reaction 

module.exports = router;