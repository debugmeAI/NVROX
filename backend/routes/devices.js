require("module-alias/register");

const express = require("express");
const router = express.Router();
const knex = require("@db/knex");

router.get("/devices", async (req, res) => {
    try {
        const rows = await knex("devices").select("*");
        res.json(rows);
    } catch (err) {
        console.error("GET /devices error:", err.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.post("/devices", async (req, res) => {
    const { mac_address, location, status } = req.body;

    if (!mac_address) {
        return res.status(400).json({ error: "mac_address is required" });
    }

    const validStatus = ["Active", "Inactive"];
    const finalStatus = validStatus.includes(status) ? status : "Inactive";

    try {
        const exists = await knex("devices")
            .select("mac_address")
            .where({ mac_address })
            .first();

        if (exists) {
            return res.status(409).json({ error: "Device already exists" });
        }

        await knex("devices").insert({
            mac_address,
            location: location || null,
            status: finalStatus,
        });

        res.status(201).json({ message: "Device saved" });
    } catch (err) {
        console.error("POST /devices error:", err.message);
        res.status(500).json({ error: "Database error" });
    }
});

module.exports = router;
