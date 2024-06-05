/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("comment", (table) => {
            table.increments("id").primary();
            table
                .integer("content_id")
                .unsigned()
                .references("content.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table
                .integer("user_id")
                .unsigned()
                .references("user.id")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
            table.text("comment_text", 1000).notNullable();
            table.smallint("likes").notNullable().defaultTo(0);
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("comment")
};
