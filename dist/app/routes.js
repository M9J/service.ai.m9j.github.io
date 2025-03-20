"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Define the routes
router.get("/", (_, res) => {
    res.send("services.AI.m9j.github.io");
});
router.post("/ai/:model_name/predict", (req, res) => {
    const model_name = req.params.model_name;
    const requestBody = req.body;
    const prediction = "greeting";
    const response = {
        prompt: requestBody.prompt,
        prediction: prediction,
        model_name,
    };
    res.json(response);
});
exports.default = router;
