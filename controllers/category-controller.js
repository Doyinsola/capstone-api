const knex = require("knex")(require("../knexfile"));

const getCategories = async (_req, res) => {
    try {
        const data = await knex
            .distinct(
                "category_id",
                "category_name"
            )
            .from("content_category")
            .join("category", "category.id", "category_id");
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving categories");
    }
};

module.exports = {
    getCategories,
}