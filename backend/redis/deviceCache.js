const redis = require("./index");
const knex = require("@db/knex");

const getDeviceId = async (mac_address) => {
    const key = `device:${mac_address}`;
    let id = await redis.get(key);

    if (id) {
        return Number(id);
    }

    const device = await knex("devices")
        .select("id")
        .where({ mac_address, status: "Active" })
        .first();

    if (!device) return null;

    id = device.id;

    await redis.set(key, id, "EX", 3600);

    return id;
};

const clearDeviceCache = async (mac_address) => {
    const key = `device:${mac_address}`;
    await redis.del(key);
};

module.exports = {
    getDeviceId,
    clearDeviceCache,
};
