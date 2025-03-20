import express, { Request, Response } from "express";
import IntentRecognitionService from "./ai/intent-recognition/intentRecognition.ts";
import { IPredictRequest, IPredictResponse } from "./types.ts";
import { logger } from "./utils.ts";

const router = express.Router();

router.get("/", (_: Request, res: Response) => {
  res.send("service.AI.m9j.github.io");
});

router.post("/ai/intent/predict", async (req: Request, res: Response) => {
  logger(req.method + ":" + req.url);
  const requestBody: IPredictRequest = req.body;
  const irService = IntentRecognitionService.getInstance();
  const prompt = requestBody.prompt;
  const minPredictionRank = requestBody.min_prediction_rank || 0;
  const { predictedValue, predictionRank }: any = await irService.predict(
    prompt,
    minPredictionRank
  );
  const response: IPredictResponse = {
    model_name: "intent-recognition",
    prompt: prompt,
    prediction: predictedValue,
    prediction_rank: predictionRank,
  };

  res.json(response);
});

export default router;
