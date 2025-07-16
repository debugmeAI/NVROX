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
            console.log("[CONNECTED] Redis Connected");
        } else {
            console.warn("[ERROR] Unexpected response:", res);
        }
    })
    .catch((err) => {
        console.error("[ERROR] Connection failed", err.message);
    });

module.exports = redis;
