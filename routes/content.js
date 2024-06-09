const router = require("express").Router();
const contentController = require("../controllers/content-controller");

router
    .route("/:id")
    .get(contentController.getContent);

router
    .route("/:id/like")
    .patch(contentController.likeContent);

router
    .route("/:id/comments")
    .get(contentController.getComments)
    .post(contentController.postComment);

router
    .route("/:contentId/comments/:commentId/like")
    .patch(contentController.likeComment);

router
    .route("/:contentId/comments/:commentId")
    .delete(contentController.deleteComment);
module.exports = router;