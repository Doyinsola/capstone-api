const router = require("express").Router();
const userController = require("../controllers/user-controller");

router
    .route("/login")
    .post(userController.loginUser);

router
    .route("/profile")
    .get(userController.getUser);
module.exports = router;