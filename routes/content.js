const router = require("express").Router();
const contentController = require("../controllers/content-controller");

router
    .route("/:id")
    .get(contentController.getContent);

module.exports = router;