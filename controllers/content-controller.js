const knex = require("knex")(require("../knexfile"));

const getContent = async (req, res) => {
    const { id } = req.params;
    try {
        let contentData = await knex
            .select(
                "content.id",
                "content.name",
                "content.about",
                "content.likes",
                "content.image_URL",
                "content.featured",
                "content.external_URL",
                knex.raw('JSON_ARRAYAGG(category.category_name) as Categories'),
                "content.description",
            )
            .from("content")
            .join("content_category", "content_id", "content.id")
            .join("category", "category.id", "category_id")
            .where("content.id", id)
            .groupBy("content.id")
            .first();
        res.status(200).json(contentData);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving content");
    }
}

const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        const commentData = await knex("comment")
            .select(
                "content.name",
                knex.raw("concat(user.first_name, ' ' , user.last_name) as name"),
                "comment_text",
                "comment.id",
                "comment.likes",
                "comment.created_at as timestamp"
            )
            .from("comment")
            .join("content", "content.id", "comment.content_id")
            .join("user", "user.id", "comment.user_id")
            .where("comment.content_id", id);
        res.status(200).json(commentData);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving comment");
    }
}
module.exports = {
    getContent,
    getComments,
}