const router = require('express').Router();


// Import controllers
const {
    getAllUsers,
    addUser,
    getOneUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');


 // GET Users and Post Users    
router.route('/').get(getAllUsers).post(addUser);// /api/users
 

// Get One User, Update User, and Delete Use    
router.route('/:userId').get(getOneUser).put(updateUser).delete(deleteUser);//  /api/users/:userId


// Create new Friend and Delete Friend  
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);//  /users/:userId/friends/:friendId


module.exports = router;