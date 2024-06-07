const router = require("express").Router();
const categoryController = require("../controllers/category-controller");

router
    .route("/")
    .get(categoryController.getCategories);

router
    .route("/:id")
    .get(categoryController.getCategoryById);

router
    .route("/:id/content")
    .get(categoryController.getCategoryContent);

module.exports = router;