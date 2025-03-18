"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_ts_1 = __importDefault(require("../../util/service.ts"));
const loader_ts_1 = require("../../util/loader.ts");
const tf = __importStar(require("@tensorflow/tfjs-node"));
const model_config_ts_1 = __importDefault(require("./model.config.ts"));
class IntentRecognition extends service_ts_1.default {
    get isAlive() {
        return this._isAlive;
    }
    constructor() {
        super();
        this._isAlive = false;
        this._model = null;
        this._embedder = null;
        this._labels = null;
    }
    async initialize() {
        await tf.setBackend("tensorflow"); // Or 'wasm' for WebAssembly
        await tf.ready();
        const model = await (0, loader_ts_1.loadModel)(model_config_ts_1.default.modelPath);
        if (model)
            this._model = model;
        const labels = await (0, loader_ts_1.loadLabels)(model_config_ts_1.default.modelPath);
        if (labels)
            this._labels = labels;
        const embedder = await (0, loader_ts_1.loadUSE)();
        if (embedder)
            this._embedder = embedder;
        if (model && embedder) {
            const promptEmbedding = await embedder.embed(["test"]);
            model.predict(tf.tensor2d(promptEmbedding.arraySync()));
        }
        this._isAlive = true;
        return this._isAlive;
    }
    async predict(prompt) {
        if (!this._isAlive) {
            return "Service is not alive";
        }
        if (prompt && this._model && this._embedder && this._labels) {
            const promptEmbedding = await this._embedder.embed([prompt]);
            const prediction = this._model.predict(tf.tensor2d(promptEmbedding.arraySync()));
            const tensor = Array.isArray(prediction) ? prediction[0] : prediction;
            const predictedIndex = tensor.argMax(-1).dataSync()[0];
            const intentLabels = this._labels;
            return intentLabels[predictedIndex];
        }
    }
}
exports.default = IntentRecognition;
