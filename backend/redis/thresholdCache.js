const redis = require("./index");
const knex = require("@db/knex");

const getThresholds = async (deviceId) => {
    const key = `thresholds:${deviceId}`;
    let cached = await redis.get(key);

    if (cached) {
        return JSON.parse(cached);
    }

    const thresholds = await knex("sensor_thresholds").where({
        device_id: deviceId,
    });

    if (thresholds.length > 0) {
        await redis.set(key, JSON.stringify(thresholds), "EX", 3600);
    }

    return thresholds;
};

const clearThresholdCache = async (deviceId) => {
    const key = `thresholds:${deviceId}`;
    await redis.del(key);
};

module.exports = {
    getThresholds,
    clearThresholdCache,
};
