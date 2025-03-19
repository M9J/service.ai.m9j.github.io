import Service from "../../util/service.ts";
import { loadLabels, loadModel, loadUSE } from "../../util/loader.ts";
import * as tf from "@tensorflow/tfjs-node";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import CONFIG from "./model.config.ts";
import { logger } from "../../utils.ts";

export default class IntentRecognitionService extends Service {
  private _isAlive: boolean = false;
  private _model: tf.LayersModel | null = null;
  private _embedder: use.UniversalSentenceEncoder | null = null;
  private _labels: string[] | null = null;

  get isAlive() {
    return this._isAlive;
  }

  constructor() {
    super();
  }

  async initialize() {
    try {
      logger("Initializing Intent-Recognition Service...");
      await tf.setBackend("tensorflow");
      await tf.ready();
      logger("Loading model...");
      const model = await loadModel(CONFIG.modelPath);
      if (model) this._model = model;
      logger("Loaded model.");
      logger("Loading labels...");
      const labels = await loadLabels(CONFIG.labelsPath);
      if (labels) this._labels = labels;
      logger("Loaded labels.");
      logger("Loading USE...");
      const embedder = await loadUSE();
      if (embedder) this._embedder = embedder;
      logger("Loaded USE.");
      logger("Warming up model prediction...");
      if (model && embedder) {
        const promptEmbedding = await embedder.embed(["test"]);
        model.predict(tf.tensor2d(promptEmbedding.arraySync()));
        logger("Warmed up.");
      }
      logger("Initialized Intent-Recognition Service.");
      this._isAlive = true;
    } catch (error: any) {
      logger("Error during initialization: " + error.message);
      this._isAlive = false;
    }
    return this._isAlive;
  }

  async predict(prompt: string) {
    if (!this._isAlive) {
      logger("Service is not alive");
      return null;
    }
    if (prompt && this._model && this._embedder && this._labels) {
      const promptEmbedding = await this._embedder.embed([prompt]);
      const prediction = this._model.predict(tf.tensor2d(promptEmbedding.arraySync()));
      const tensor = Array.isArray(prediction) ? prediction[0] : (prediction as tf.Tensor);
      const predictedIndex = tf.argMax(tensor, -1).dataSync()[0];
      const intentLabels = this._labels;
      return intentLabels[predictedIndex];
    }
    return null;
  }
}
