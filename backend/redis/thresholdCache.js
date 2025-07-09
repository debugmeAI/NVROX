const redis = require("./index");
const knex = require("@db/knex");

const getThresholds = async (macAddress) => {
    const key = `thresholds:${macAddress}`;
    let cached = await redis.get(key);

    if (cached) {
        return JSON.parse(cached);
    }

    const thresholds = await knex("sensor_thresholds").where({
        mac_address: macAddress,
    });

    if (thresholds.length > 0) {
        await redis.set(key, JSON.stringify(thresholds), "EX", 3600); // 1 jam
    }

    return thresholds;
};

const clearThresholdCache = async (macAddress) => {
    const key = `thresholds:${macAddress}`;
    await redis.del(key);
};

module.exports = {
    getThresholds,
    clearThresholdCache,
};
