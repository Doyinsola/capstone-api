const router = require("express").Router();
const contentController = require("../controllers/content-controller");

router
    .route("/:id")
    .get(contentController.getContent);
router
    .route("/:id/comments")
    .get(contentController.getComments)

module.exports = router;