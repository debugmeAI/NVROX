require("module-alias/register");

const mqtt = require("mqtt");
const pool = require("@db/config");
const { brokerUrl, options, topic, qos } = require("@mqtt/config");

const client = mqtt.connect(brokerUrl, {
    ...options,
    clientId: `backend_logger_${Date.now()}_${Math.floor(
        Math.random() * 1000
    )}`,
});

client.on("connect", () => {
    console.log("Subscriber connected");

    client.subscribe(topic, { qos }, (err) => {
        if (err) {
            console.error("Subscribe error:", err.message);
        } else {
            console.log(`Subscribed to topic: ${topic}`);
        }
    });
});

client.on("message", async (receivedTopic, message) => {
    if (receivedTopic !== topic) return;

    try {
        const data = JSON.parse(message.toString());
        const { device_id, temp, humid, timestamp } = data;

        const conn = await pool.getConnection();

        const [rows] = await conn.query(
            "SELECT 1 FROM device WHERE device_id = ? LIMIT 1",
            [device_id]
        );

        if (rows.length === 0) {
            console.warn(`${device_id} NOT REGISTERED — Ignored`);
            conn.release();
            return;
        }

        await conn.query(
            "INSERT INTO sensor_data (device_id, temp, humid, timestamp) VALUES (?, ?, ?, ?)",
            [device_id, temp, humid, new Date(timestamp)]
        );

        conn.release();
        console.log(`Saved: ${device_id} | ${temp}°C | ${humid}%`);
    } catch (err) {
        console.error("Error saving data:", err.message);
    }
});
