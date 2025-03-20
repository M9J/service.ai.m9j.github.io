import cors from "cors";
import express from "express";
import { initializeAIServices } from "./ai/initializer.ts";
import router from "./routes.ts";
import { logger } from "./utils.ts";
import fs from "fs";
import https from "https";
import path from "path";

const app = express();
const PORT = process.env.PORT || 8000;
const rootPath = process.cwd();

app.use(express.json());
app.use(cors());

app.use("/", router);

logger("Server starting...");
logger("AI Services initializing...");
await initializeAIServices();
logger("AI Services initialized.");

const httpsOptions = {
  key: fs.readFileSync(path.join(rootPath, `/certs/server.key`)), // Path to your private key
  cert: fs.readFileSync(path.join(rootPath, `/certs/server.crt`)), // Path to your certificate
};

app.listen(PORT, () => {
  logger("Server started...");
  logger(`HTTP server running on http://<IP_ADDRESS>:${PORT}`);
});

https.createServer(httpsOptions, app).listen(443, () => {
  logger(`HTTPS server running on https://<IP_ADDRESS>:443`);
});
