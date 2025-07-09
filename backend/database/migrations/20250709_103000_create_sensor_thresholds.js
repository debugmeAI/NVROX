/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("sensor_thresholds", function (table) {
        table.increments("id").primary();
        table
            .integer("device_id")
            .unsigned()
            .references("id")
            .inTable("devices")
            .onDelete("CASCADE");
        table.enu("parameter", ["Temperature", "Humidity"]);
        table.unique(["device_id", "parameter"]);
        table.decimal("lower_limit", 5, 2);
        table.decimal("upper_limit", 5, 2);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists("sensor_thresholds");
};
