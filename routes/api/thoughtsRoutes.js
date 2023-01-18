const router = require('express').Router();


// Import controllers
const {
  getAllThoughts,
  addThought,
  getOneThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require("../../controllers/thoughtController");

// Get all Thoughts and Post new Thought
router.route("/").get(getAllThoughts).post(addThought);// api/thoughts


// Get one Thought, Update Thought, and Delete Thought
router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);// api/thoughts/:thoughtId


// Post new Reaction
router.route("/:thoughtId/reactions").post(addReaction);// api/thoughts/:thoughtId/reactions


// Delete Reaction
router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);// api/thoughts/:thoughtId/reactions/:reactionId



module.exports = router;