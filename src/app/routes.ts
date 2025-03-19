import express, { Request, Response } from "express";
import IntentRecognitionService from "./ai/intent-recognition/intentRecognition.ts";
import { IPredictRequest, IPredictResponse } from "./types.ts";
import { logger } from "./utils.ts";

const router = express.Router();

// Define the routes
router.get("/", (_: Request, res: Response) => {
  res.send("service.AI.m9j.github.io");
});

router.post("ai/intent/predict", async (req: Request, res: Response) => {
  logger(req.method + ":" + req.url);
  const model_name: string = req.params.model_name;
  const requestBody: IPredictRequest = req.body;
  const irService = IntentRecognitionService.getInstance();
  const prompt = requestBody.prompt;
  const prediction = await irService.predict(prompt);
  const response: IPredictResponse = {
    model_name,
    prompt: prompt,
    prediction: prediction || "",
  };

  res.json(response);
});

export default router;
