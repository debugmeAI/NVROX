const redis = require("./index");
const knex = require("@db/knex");

const getDeviceId = async (mac_address) => {
    const key = `device:${mac_address}`;
    const cached = await redis.get(key);

    if (cached) {
        return cached;
    }

    const device = await knex("devices")
        .where({ mac_address, status: "Active" })
        .first();

    if (!device) return null;

    await redis.set(key, device.mac_address);

    return device.mac_address;
};

const clearDeviceCache = async () => {
    const deviceKeys = await redis.keys("device:*");

    if (deviceKeys.length > 0) await redis.del(...deviceKeys);
};

module.exports = {
    getDeviceId,
    clearDeviceCache,
};
