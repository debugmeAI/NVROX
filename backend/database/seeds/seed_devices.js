/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    // Hapus semua data lama
    await knex("devices").del();

    // Insert data baru
    await knex("devices").insert([
        {
            mac_address: "AA:BB:CC:DD:EE:01",
            location: "Line A",
            status: "Active",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            mac_address: "AA:BB:CC:DD:EE:02",
            location: "Line B",
            status: "Active",
            created_at: new Date(),
            updated_at: new Date(),
        },
        {
            mac_address: "AA:BB:CC:DD:EE:03",
            location: "Line C",
            status: "Inactive",
            created_at: new Date(),
            updated_at: new Date(),
        },
    ]);
};
