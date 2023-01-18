const { User, Thought } = require("../models");

// Export controllers to handle db 
module.exports = {

    // Request all thoughts
    getAllThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },

    // Create new thought
    addThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { username: req.body.username },
                    { $addToSet: { thoughts: thought._id } },
                    { new: true }
                )
            })
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Request one thought
    getOneThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that id" })
                    : res.json({
                        thought,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that id! " })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a thought
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that id" })
                    : res.json({ message: "Thought deleted" }))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Create new reaction
    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true })
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: "No thought with that id" })
                    : res.json(thought))
            .catch((err) => res.status(500).json(err));
    },

    // Delete a reaction
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No thought with that id" })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

};