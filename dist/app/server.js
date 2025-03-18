"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const initializer_ts_1 = require("./ai/initializer.ts");
const routes_ts_1 = __importDefault(require("./routes.ts"));
const utils_ts_1 = require("./utils.ts");
const app = (0, express_1.default)();
const PORT = 3000;
app.use("/", routes_ts_1.default);
(0, utils_ts_1.logger)("Server starting...");
(0, utils_ts_1.logger)("AI Services initializing...");
await (0, initializer_ts_1.initializeAIServices)();
app.listen(PORT, () => {
    (0, utils_ts_1.logger)("Server started...");
    (0, utils_ts_1.logger)("Server running on http://localhost:8000");
});
