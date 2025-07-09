require("module-alias/register");

const mqtt = require("mqtt");
const knex = require("@db/knex");
const { brokerUrl, options, topic, qos } = require("@mqtt/mqttConfig");

const { getThresholds } = require("@redis/thresholdCache");

const client = mqtt.connect(brokerUrl, {
    ...options,
    clientId: `backend_logger_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
});

client.on("connect", () => {
    console.log("[CONNECTED] Subscribe to broker");

    client.subscribe(topic, { qos }, (err) => {
        if (err) {
            console.error("[ERROR] Subscribe", err.message);
        } else {
            console.log(`[SUCCESS] Subscribed to topic ${topic}`);
        }
    });
});

client.on("message", async (receivedTopic, message) => {
    if (receivedTopic !== topic) return;

    try {
        const data = JSON.parse(message.toString());
        const { mac_address, temp, humid, timestamp } = data;

        const device = await knex("devices")
            .where({ mac_address, status: "Active" })
            .first();

        if (!device) {
            console.warn(`[IGNORED] ${mac_address} not registered or inactive`);
            return;
        }
        await knex("sensor_readings").insert({
            mac_address, // FK
            temperature: temp,
            humidity: humid,
            recorded_at: knex.fn.now(),
        });

        console.log(`[SAVED] ${mac_address} | ${temp}°C | ${humid}%`);

        const thresholds = await getThresholds(mac_address);
        const alerts = [];

        thresholds.forEach((t) => {
            const value = t.parameter === "Temperature" ? temp : humid;

            if (value < t.lower_limit) {
                alerts.push({
                    mac_address,
                    parameter: t.parameter,
                    value: value,
                    threshold: t.lower_limit,
                    status: "Deceed",
                    recorded_at: knex.fn.now(),
                });
            }

            if (value > t.upper_limit) {
                    alerts.push({
                    mac_address,
                    parameter: t.parameter,
                    value: value,
                    threshold: t.upper_limit,
                    status: "Exceed",
                    recorded_at: knex.fn.now(),
                });
            }
        });

        if (alerts.length > 0) {
            await knex("alerts").insert(alerts);
            console.warn(
                `[ALERT] Triggered for ${mac_address}: ${alerts.length} alert(s)`
            );
        }
    } catch (err) {
        console.error("[ERROR] handling message:", err.message);
    }
});
