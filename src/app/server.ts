import express from "express";
import { initializeAIServices } from "./ai/initializer.ts";
import router from "./routes.ts";
import { logger } from "./utils.ts";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use("/", router);
app.use(cors());

logger("Server starting...");
logger("AI Services initializing...");
await initializeAIServices();
logger("AI Services initialized.");

app.listen(PORT, () => {
  logger("Server started...");
  logger(`Server running on http://<IP_ADDRESS>:${PORT}`);
});
