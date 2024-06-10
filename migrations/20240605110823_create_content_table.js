/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
        .createTable("content", (table) => {
            table.increments("id").primary();
            table.string("name").notNullable();
            table.string("about").notNullable();
            table.smallint("likes").notNullable().defaultTo(0);
            table.string("image_URL").notNullable();
            table.boolean("featured").notNullable();
            table.text("description").notNullable();
            table.string("external_URL").notNullable();
            table.timestamp("created_at").defaultTo(knex.fn.now());
            table
                .timestamp("updated_at")
                .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTable("content")
};
