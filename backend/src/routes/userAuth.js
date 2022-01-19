const express = require("express");
const router = express.Router();

const userAuthController = require("../controllers/userAuth");
// const auth = require('../middleware/auth');


router.get("/:email", userAuthController.getUserInfo);
router.get("/", userAuthController.getUsers);

// Post method for log in
router.post('/login', userAuthController.login);
router.post("/", userAuthController.createUserAuth);
 
//  router.put("/:email", userAuthController.updateUserAuth);
 
 router.delete("/:email", userAuthController.deleteUserAuth);

 // Authorization route
// router.get('/authorize', auth, userAuthController.isAdmin);

router.get("/userByToken/:token", userAuthController.getUserAuthByToken);

module.exports = router; 