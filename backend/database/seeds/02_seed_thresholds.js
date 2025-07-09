/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("sensor_thresholds").del();

    await knex("sensor_thresholds").insert([
        {
            mac_address: "AA:BB:CC:DD:EE:01",
            parameter: "Temperature",
            lower_limit: 20.0,
            upper_limit: 30.0,
            created_at: new Date()
        },
        {
            mac_address: "AA:BB:CC:DD:EE:01",
            parameter: "Humidity",
            lower_limit: 40.0,
            upper_limit: 60.0,
            created_at: new Date()
        },
        {
            mac_address: "AA:BB:CC:DD:EE:02",
            parameter: "Temperature",
            lower_limit: 22.0,
            upper_limit: 32.0,
            created_at: new Date()
        },
        {
            mac_address: "AA:BB:CC:DD:EE:02",
            parameter: "Humidity",
            lower_limit: 35.0,
            upper_limit: 55.0,
            created_at: new Date()
        }
    ]);
};
