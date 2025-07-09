const redis = require("./index");

const checkRedisConnection = async () => {
    try {
        const pong = await redis.ping();
        if (pong === "PONG") {
            console.log("✅ [REDIS] Connected");
            return true;
        }
    } catch (err) {
        console.error("❌ [REDIS] Connection failed:", err.message);
        return false;
    }
};

const checkDeviceCache = async (mac_address) => {
    const key = `device:${mac_address}`;
    const exists = await redis.exists(key);
    const value = await redis.get(key);
    console.log(`\n🔎 [Device Cache] Key: ${key}`);
    console.log(`  Exists: ${exists ? "✅ Yes" : "❌ No"}`);
    if (exists) {
        console.log(`  Value : ${value}`);
    }
};

// Cek cache untuk threshold
const checkThresholdCache = async (deviceId) => {
    const key = `thresholds:${deviceId}`;
    const exists = await redis.exists(key);
    const value = await redis.get(key);
    console.log(`\n🔎 [Threshold Cache] Key: ${key}`);
    console.log(`  Exists: ${exists ? "✅ Yes" : "❌ No"}`);
    if (exists) {
        try {
            console.log(`  Value :`, JSON.parse(value));
        } catch {
            console.log(`  Value :`, value);
        }
    }
};

const runAllChecks = async () => {
    const isConnected = await checkRedisConnection();
    if (!isConnected) return;

    await checkDeviceCache("AA:BB:CC:DD:EE:36");
    await checkThresholdCache(1);
};

runAllChecks();
