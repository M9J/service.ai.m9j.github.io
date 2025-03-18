import * as tf from "@tensorflow/tfjs-node";
import * as use from "@tensorflow-models/universal-sentence-encoder";

export async function loadModel(modelPath: string) {
  const model = await tf.loadLayersModel(modelPath);
  if (model) return model;
}

export async function loadLabels(labelsPath: string) {
  const labelsReq = await fetch(labelsPath);
  if (labelsReq) return labelsReq.json();
}

export async function loadUSE() {
  const embedder = await use.load();
  if (embedder) return embedder;
}
