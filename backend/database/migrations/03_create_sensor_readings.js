/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("sensor_readings", function (table) {
        table.increments("id").primary();
        table
            .string("mac_address")
            .references("mac_address")
            .inTable("devices")
            .onDelete("CASCADE");
        table.decimal("temperature", 5, 2);
        table.decimal("humidity", 5, 2);
        table.timestamp("recorded_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("sensor_readings");
};
