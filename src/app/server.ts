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

// List of allowed origins
// const allowedOrigins = ["https://localhost:4200", "https://m9j.github.io"];

// Dynamically set the origin
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (like mobile apps or CURL requests)
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     // allowedHeaders: ["Content-Type", "Authorization"],
//     // credentials: true, // If you need cookies or authentication tokens
//   })
// );

app.use(cors());

app.use("/", router);

logger("Server starting...");
logger("AI Services initializing...");
await initializeAIServices();
logger("AI Services initialized.");

const httpsOptions = {
  key: fs.readFileSync(path.join(rootPath, `/certs/server.key`)), // Path to your private key
  cert: fs.readFileSync(path.join(rootPath, `/certs/server.cert`)), // Path to your certificate
};

app.listen(PORT, () => {
  logger("Server started...");
  logger(`Server running on http://<IP_ADDRESS>:${PORT}`);
});

https.createServer(httpsOptions, app).listen(443, () => {
  console.log("HTTPS Server running on port 443");
});
