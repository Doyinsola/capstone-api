const knex = require("knex")(require("../knexfile"));

const getFeaturedContent = async (_req, res) => {
    try {
        const data = await knex
            .select(
                "content.id",
                "content.name",
                "content.about",
                "content.likes",
                "content.image_URL",
                "content.featured",
                knex.raw('JSON_ARRAYAGG(category.category_name) as Categories')
            )
            .from("content")
            .join("content_category", "content_id", "content.id")
            .join("category", "category.id", "category_id")
            .where("featured", true)
            .groupBy("content.id");
        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(400).send("Error retrieving featured content");
    }
};

module.exports = {
    getFeaturedContent,
}