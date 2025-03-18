import IntentRecognitionService from "./intent-recognition/intentRecognition.ts";

export async function initializeAIServices() {
  const irService = IntentRecognitionService.getInstance();
  await irService.initialize();
}
