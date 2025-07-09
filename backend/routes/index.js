const express = require("express");
const router = express.Router();

const devicesRoute = require("./devices");
const sensorDataRoute = require("./sensorData");

router.use("/devices", devicesRoute);
router.use("/sensor-data", sensorDataRoute);

module.exports = router;
