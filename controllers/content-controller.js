const knex = require("knex")(require("../knexfile"));


const getContent = async (req, res) => {
    const { id } = req.params;
    try {
        const contentData = await knex
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
};

const likeContent = async (req, res) => {
    const { id } = req.params;
    try {
        const contentLikes = await knex
            .select(
                "content.likes",
            )
            .from("content")
            .where("content.id", id)
            .first();
        contentLikes.likes += 1;
        req.body = { "likes": contentLikes.likes };

        const likedContent = await knex("content")
            .where({ id })
            .update(req.body);

        if (likedContent === 0) {
            return res.status(404).json({
                message: `Content with ID ${id} not found`
            });
        };

        const updatedContent = await knex
            .select(
                "content.id",
                "content.name",
                "content.likes",
                "content.updated_at"
            )
            .from("content")
            .where("content.id", id)
            .first();
        res.status(200).json(updatedContent);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Unable to like content with ID ${id}`
        });
    }
}

const getComments = async (req, res) => {
    const { id } = req.params;
    try {
        const commentData = await knex
            .select(
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
};

const postComment = async (req, res) => {
    const { id } = req.params;
    let {
        content_id,
        user_id,
        comment_text,
    } = req.body;

    if (!content_id || !user_id || !comment_text) {
        return res.status(400).json({ error: "All fields are required." });
    };

    if (content_id == id) {
        try {
            const addComment = await knex("comment")
                .insert(req.body);

            const newCommentId = addComment[0];
            const newComment = await knex
                .select(
                    knex.raw("concat(user.first_name, ' ' , user.last_name) as name"),
                    "comment_text",
                    "comment.id",
                    "comment.likes",
                    "comment.created_at as timestamp"
                )
                .from("comment")
                .join("content", "content.id", "comment.content_id")
                .join("user", "user.id", "comment.user_id")
                .where("comment.id", newCommentId);
            res.status(201).json(newComment);
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: "Unable to post new comment",
            });
        }
    } else {
        res.status(404).json({ error: `Unable to add comment to content with id ${id}` })
    }

}

const likeComment = async (req, res) => {
    const { contentId, commentId } = req.params;
    try {
        const commentLikes = await knex
            .select(
                "comment.likes",
            )
            .from("comment")
            .where("comment.id", commentId)
            .first();
        commentLikes.likes += 1;
        req.body = { "likes": commentLikes.likes };

        const likedComment = await knex("comment")
            .where("id", commentId)
            .update(req.body);

        if (likedComment === 0) {
            return res.status(404).json({
                message: `Comment with ID ${commentId} not found`
            });
        };

        const updatedComment = await knex
            .select(
                knex.raw("concat(user.first_name, ' ' , user.last_name) as name"),
                "comment_text",
                "comment.id",
                "comment.likes",
                "comment.updated_at as timestamp"
            )
            .from("comment")
            .join("user", "user.id", "comment.user_id")
            .where("comment.id", commentId)
            .first();
        res.status(200).json(updatedComment);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Unable to like comment with ID ${commentId}`
        });
    }
}

const deleteComment = async (req, res) => {
    const { contentId, commentId } = req.params;
    try {
        const deletedComment = await knex("comment")
            .where("id", commentId)
            .delete();

        if (deletedComment === 0) {
            return res
                .status(404)
                .json({ message: `Comment with ID ${commentId} not found` });
        }
        res.status(204).json(deletedComment)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: `Unable to delete comment with id ${commentId}`
        });
    }
}
module.exports = {
    getContent,
    likeContent,
    getComments,
    postComment,
    likeComment,
    deleteComment,
}