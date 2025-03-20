export interface IPredictRequest {
  prompt: string;
  min_prediction_rank: number;
}

export interface IPredictResponse {
  model_name: string;
  prompt: string;
  prediction: string;
  prediction_rank: number;
}
