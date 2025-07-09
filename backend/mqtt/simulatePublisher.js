require("module-alias/register");

const mqtt = require("mqtt");
const { brokerUrl, options, topic, qos } = require("@mqtt/mqttConfig");

const TOTAL_DEVICES = 100;
const clients = [];

function generateMacAddress(index) {
    const hex = (index + 1).toString(16).padStart(2, "0");
    return `AA:BB:CC:DD:EE:${hex.toUpperCase()}`;
}

for (let i = 0; i < TOTAL_DEVICES; i++) {
    const macAddress = generateMacAddress(i);
    const clientId = `device_sim_${i + 1}`;

    const client = mqtt.connect(brokerUrl, {
        ...options,
        clientId,
    });

    client.on("connect", () => {
        console.log(`${clientId} connected`);
        setTimeout(() => {
            setInterval(() => {
                const payload = JSON.stringify({
                    mac_address: macAddress,
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
