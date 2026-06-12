export function getFraudApiUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_FRAUD_API_URL;
  return url && url.trim().length > 0 ? url.replace(/\/$/, "") : null;
}

export function getExoplanetApiUrl(): string | null {
  const url = process.env.NEXT_PUBLIC_EXOPLANET_API_URL;
  return url && url.trim().length > 0 ? url.replace(/\/$/, "") : null;
}

export function isFraudApiConfigured(): boolean {
  return getFraudApiUrl() !== null;
}

export function isExoplanetApiConfigured(): boolean {
  return getExoplanetApiUrl() !== null;
}

/** Default predict path for exoplanet API; override via env if needed. */
export function getExoplanetPredictPath(): string {
  return process.env.NEXT_PUBLIC_EXOPLANET_PREDICT_PATH || "/predict_batch";}
