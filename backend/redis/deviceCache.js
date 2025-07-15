const redis = require("./index");
const knex = require("@db/knex");

const getDeviceId = async (mac_address) => {
    const key = `device:${mac_address}`;
    const cached = await redis.get(key);

    if (cached) {
        return (cached);
    }

    const device = await knex("devices")
        .where({ mac_address, status: "Active" })
        .first();

    if (!device) return null;

    await redis.set(key, device.mac_address);

    return device.mac_address;
};

const clearDeviceCache = async (mac_address) => {
    const key = `device:${mac_address}`;
    await redis.del(key);
};

module.exports = {
    getDeviceId,
    clearDeviceCache,
};
