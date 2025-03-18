export interface IPredictRequest {
  prompt: string;
}

export interface IPredictResponse {
  model_name: string;
  prompt: string;
  prediction: string;
}
