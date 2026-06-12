import type { ExoplanetInput, ExoplanetPrediction } from "../types";
import { getExoplanetApiUrl, getExoplanetPredictPath } from "./config";
import { postJson } from "./client";

export async function predictExoplanet(
  input: ExoplanetInput
): Promise<ExoplanetPrediction> {
  const baseUrl = getExoplanetApiUrl();

  if (!baseUrl) {
    throw new Error(
      "Exoplanet API is not configured. Set NEXT_PUBLIC_EXOPLANET_API_URL."
    );
  }

  const path = getExoplanetPredictPath();

  const response = await postJson<
    {
      total_stars: number;
      threshold: number;
      predictions: {
        star_id: string;
        host_likeness_score: number;
        host_likeness_percent: number;
        label: string;
        prediction: "host-like" | "not host-like";
        note: string;
      }[];
    },
    { stars: ExoplanetInput[] }
  >(`${baseUrl}${path}`, {
    stars: [input],
  });

  const prediction = response.predictions[0];

  return {
    prediction: prediction.prediction === "host-like" ? "host" : "no_host",
    probability: prediction.host_likeness_score,
    confidence:
      prediction.host_likeness_score >= 0.9 ||
      prediction.host_likeness_score <= 0.3
        ? "high"
        : prediction.host_likeness_score >= 0.7 ||
            prediction.host_likeness_score <= 0.5
          ? "medium"
          : "low",
    feature_importance: [],
  };
}