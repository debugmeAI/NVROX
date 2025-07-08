require("module-alias/register");

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mqtt = require("mqtt");
const pool = require("./db");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // ganti dengan domain frontend kamu kalau produksi
    },
});

// Serve frontend statis (optional)
// app.use(express.static("public"));

const mqttClient = mqtt.connect("mqtt://localhost:1883", {
    clientId: "subscriber_socket",
    clean: true,
    connectTimeout: 4000,
    reconnectPeriod: 1000,
});

mqttClient.on("connect", () => {
    console.log("MQTT CONNECTED");
    mqttClient.subscribe("iot/temp-hum", { qos: 1 }, (err) => {
        if (err) console.error("MQTT subscribe error:", err.message);
        else console.log("Subscribed to iot/temp-hum");
    });
});

mqttClient.on("message", async (topic, message) => {
    try {
        const data = JSON.parse(message.toString());
        const { device_id, temp, humid, timestamp } = data;

        // Cek valid device
        const conn = await pool.getConnection();
        const [rows] = await conn.query(
            "SELECT 1 FROM device WHERE device_id = ? LIMIT 1",
            [device_id]
        );

        if (rows.length > 0) {
            await conn.query(
                "INSERT INTO sensor_data (device_id, temp, humid, timestamp) VALUES (?, ?, ?, ?)",
                [device_id, temp, humid, new Date(timestamp)]
            );

            // 🔥 Emit ke frontend via Socket.IO
            io.emit("sensor_data", {
                device_id,
                temp,
                humid,
                timestamp,
            });
        } else {
            console.warn(`⛔ ${device_id} not registered`);
        }

        conn.release();
    } catch (err) {
        console.error("❌ MQTT processing error:", err.message);
    }
});

io.on("connection", (socket) => {
    console.log("🟢 WebSocket client connected");

    socket.on("disconnect", () => {
        console.log("🔴 WebSocket client disconnected");
    });
});

server.listen(3001, () => {
    console.log("Server listening on http://localhost:3001");
});
