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

const getCategoryById = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await knex
            .select("category_id",
                "category_name")
            .from("content_category")
            .join("category", "category.id", "category_id")
            .where({ id }).first();
        if (!category) {
            res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving category");
    }
}

const getCategoryContent = async (req, res) => {
    const { id } = req.params;

    try {
        const categoryWithContent = await knex("content_category")
            .where("category_id", id);
        if (categoryWithContent == 0) {
            res.status(404).json({ message: "Category not found" });
        } else {
            const data = await knex
                .select(
                    "content.id",
                    "content.name",
                    "content.about",
                    "content.likes",
                    "content.image_URL",
                    "content.featured",
                    "category.category_name"
                )
                .from("content")
                .join("content_category", "content_id", "content.id")
                .join("category", "category.id", "category_id")
                .where("category_id", id)
                .groupBy("content.id");
            res.status(200).json(data);
        }
    } catch (error) {
        console.log(error);
        res.status(400).send("Error retrieving category");
    }

}

module.exports = {
    getCategories,
    getCategoryById,
    getCategoryContent,
}