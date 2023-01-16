const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    getOneThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
  } = require("../../controllers/thoughtController");
  
  
  router.route("/").get(getAllThoughts).post(addThought);
   
  router.route("/:thoughtId").get(getOneThought).put(updateThought).delete(deleteThought);
    
  router.route("/:thoughtId/reactions").post(addReaction);
    
  router.route("/:thoughtId/reactions/:reactionId").delete(removeReaction);
  
  


module.exports = router;