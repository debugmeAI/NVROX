require("module-alias/register");

const mqtt = require("mqtt");
const { brokerUrl, options, topic, qos } = require("@mqtt/config");

const TOTAL_DEVICES = 100;
const clients = [];

for (let i = 0; i < TOTAL_DEVICES; i++) {
    const clientId = `device_${i + 1}`;

    const client = mqtt.connect(brokerUrl, {
        ...options,
        clientId,
    });

    client.on("connect", () => {
        console.log(`${clientId} connected`);
        setTimeout(() => {
            setInterval(() => {
                const payload = JSON.stringify({
                    device_id: clientId,
                    temp: (25 + Math.random() * 5).toFixed(2),
                    humid: (50 + Math.random() * 10).toFixed(2),
                    timestamp: new Date().toISOString(),
                });

                client.publish(topic, payload, { qos });
            }, 1000);
        });
    });

    client.on("error", (err) => {
        console.error(`${clientId} Error:`, err.message);
    });

    clients.push(client);
}
