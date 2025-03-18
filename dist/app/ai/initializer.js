"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initializeAIServices = initializeAIServices;
const intentRecognition_ts_1 = __importDefault(require("./intent-recognition/intentRecognition.ts"));
async function initializeAIServices() {
    const ir = new intentRecognition_ts_1.default();
    await ir.initialize();
}
