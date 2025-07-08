require("module-alias/register");

const express = require("express");
const router = express.Router();
const pool = require("@db/config");

router.get("/devices", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT * FROM device");
        res.json(rows);
    } catch (err) {
        console.error("GET /devices error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/device", async (req, res) => {
    const { device_id, location, status } = req.body;

    if (!device_id) {
        return res.status(400).json({ error: "device_id is required" });
    }

    try {
        // Cek apakah device sudah ada
        const [check] = await pool.query(
            "SELECT 1 FROM device WHERE device_id = ? LIMIT 1",
            [device_id]
        );

        if (check.length > 0) {
            return res.status(409).json({ error: "Device already exists" });
        }

        // Simpan device
        await pool.query(
            "INSERT INTO device (device_id, location, status) VALUES (?, ?, ?)",
            [device_id, location || null, status || "offline"]
        );

        res.status(201).json({ message: "Device saved" });
    } catch (err) {
        console.error("POST /device error:", err.message);
        res.status(500).json({ error: "Database error" });
    }
});

router.get("/sensor-data", async (req, res) => {
    try {
        const [rows] = await pool.query(
            "SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 100"
        );
        res.json(rows);
    } catch (err) {
        console.error("GET /sensor-data error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
