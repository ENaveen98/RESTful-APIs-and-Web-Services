const express = require("express");
const router = express.Router();

const checkAuth = require("../middleware/check-auth");

const UserController = require("../controllers/users");

router.post("/signup", UserController.users_signup);

router.post("/login", UserController.users_login);

// Later change checkAuth to allow only users who own userID to delete and not just everyone
router.delete("/:userId", checkAuth, UserController.users_delete);

module.exports = router;
