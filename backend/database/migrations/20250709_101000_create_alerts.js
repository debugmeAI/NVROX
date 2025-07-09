/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("alerts", function (table) {
        table.increments("id").primary();
        table.integer("device_id").unsigned()
            .references("device_id").inTable("devices")
            .onDelete("CASCADE");
        table.enu("parameter", ["Temperature", "Humidity"]);
        table.decimal("value", 5, 2);
        table.decimal("threshold", 5, 2);
        table.enu("status", ["Exceed", "Deceed"]);
        table.timestamp("recorded_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("alerts");
};
