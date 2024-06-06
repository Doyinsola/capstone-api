const router = require("express").Router();
const featuredController = require("../controllers/featured-controller");

router
    .route("/")
    .get(featuredController.getFeaturedContent);

module.exports = router;