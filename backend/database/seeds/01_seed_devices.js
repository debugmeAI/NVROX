/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex("devices").del();

    await knex("devices").insert([
        {
            device_name: "NVROX-01",
            mac_address: "AA:BB:CC:DD:EE:01",
            location: "Building 1",
            status: "Active",
            created_at: new Date()
        },
        {
            device_name: "NVROX-02",
            mac_address: "AA:BB:CC:DD:EE:02",
            location: "Building 2",
            status: "Active",
            created_at: new Date()
        },
        {
            device_name: "NVROX-03",
            mac_address: "AA:BB:CC:DD:EE:03",
            location: "Building 3",
            status: "Inactive",
            created_at: new Date()
        },
    ]);
};
