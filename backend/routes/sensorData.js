require("module-alias/register");

const express = require("express");
const router = express.Router();
const knex = require("@db/knex");

router.get("/sensor-data", async (req, res) => {
    try {
        const rows = await knex("sensor_readings")
            .select("*")
            .orderBy("recorded_at", "desc")
            .limit(100);
        res.json(rows);
    } catch (err) {
        console.error("GET /sensor-data error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
