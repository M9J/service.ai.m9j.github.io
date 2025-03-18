import express from "express";
import { initializeAIServices } from "./ai/initializer.ts";
import router from "./routes.ts";
import { logger } from "./utils.ts";

const app = express();
const PORT = 8000;

app.use(express.json());
app.use("/", router);

logger("Server starting...");
logger("AI Services initializing...");
await initializeAIServices();
logger("AI Services initialized.");

app.listen(PORT, () => {
  logger("Server started...");
  logger(`Server running on http://localhost:${PORT}`);
});
