require("module-alias/register");
require("dotenv").config();

const express = require("express");
const http = require("http");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

require("@db/config");

// require("@mqtt/pub");
require("@mqtt/sub");

const apiRoutes = require("@routes/api");
app.use("/api", apiRoutes);

const { setupSocket } = require("@socket/socketHandler");

const server = http.createServer(app);
setupSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
});
