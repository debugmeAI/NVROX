const Redis = require("ioredis");

const redis = new Redis({
    host: "127.0.0.1",
    port: 6379,
    // password: "your_password",
});

redis
    .ping()
    .then((res) => {
        if (res === "PONG") {
            console.log("[REDIS] Connected");
        } else {
            console.warn("[REDIS] Unexpected response:", res);
        }
    })
    .catch((err) => {
        console.error("[REDIS] Connection failed", err.message);
    });

module.exports = redis;
