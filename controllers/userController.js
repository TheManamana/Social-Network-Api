const { User, Thought } = require("../models");

// Export controllers to handle users in db 
module.exports = {

    // Request all users
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },

    // Create new user
    addUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },


    // Request one user
    getOneUser(req, res) {
        User.findOne({ _id: req.params.userId })
            .select("-__v")
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that id" })
                    : res.json({
                        user,
                    })
            )
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },

    // Update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that id" })
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },

    // Delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No user with that id" })
                    : Thought.deleteMany({ _id: { $in: user.thoughts } }))
            .then(() => res.json({ message: "User deleted" }))
            .catch((err) => {
                res.status(500).json(err);
            });
    },

    // Add new friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true })
            .then((userData) =>
                !userData
                    ? res.status(404).json({ message: "No user with that id" })
                    : res.json(userData))
            .catch((err) => res.status(500).json(err));
    },

    // Remove a friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true })
            .then((user) =>
                !user
                    ? res.status(404).json({ message: "No friend with that id" })
                    : res.json(user))
            .catch((err) => res.status(500).json(err));
    },

};