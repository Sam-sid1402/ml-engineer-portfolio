import type {
  FraudAnalysisResponse,
  FraudPrediction,
  RawFraudApiResponse,
  RawFraudApiPrediction,
} from "../types";
import { getFraudApiUrl, isFraudApiConfigured } from "./config";
import { postJson } from "./client";

export { isFraudApiConfigured, getFraudApiUrl };

function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    const nextChar = line[i + 1];

    if (char === '"' && insideQuotes && nextChar === '"') {
      current += '"';
      i += 1;
    } else if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += char;
    }
  }

  result.push(current.trim());
  return result;
}

function toTypedValue(value: string): string | number | null {
  const cleaned = value.trim();
  if (cleaned === "") return null;

  const numericValue = Number(cleaned);
  if (!Number.isNaN(numericValue) && cleaned !== "") return numericValue;

  return cleaned;
}

async function csvFileToTransactions(file: File): Promise<Record<string, unknown>[]> {
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    throw new Error("CSV must contain a header row and at least one transaction.");
  }

  const headers = parseCsvLine(lines[0]).map((header) => header.trim());
  const transactions = lines.slice(1).map((line) => {
    const values = parseCsvLine(line);
    return headers.reduce<Record<string, unknown>>((row, header, index) => {
      row[header] = toTypedValue(values[index] ?? "");
      return row;
    }, {});
  });

  return transactions;
}

function toNumber(value: unknown, fallback = 0): number {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? numberValue : fallback;
}

function normalizePrediction(
  prediction: RawFraudApiPrediction,
  threshold: number,
  index: number
): FraudPrediction {
  const fraudProbability = toNumber(prediction.fraud_probability);
  const modelPrediction = prediction.prediction;
  const isFraud =
    modelPrediction === 1 ||
    modelPrediction === true ||
    modelPrediction === "1" ||
    modelPrediction === "true" ||
    fraudProbability >= threshold;

  return {
    transaction_id:
      prediction.trans_num ?? prediction.transaction_id ?? `TXN-${String(index + 1).padStart(6, "0")}`,
    fraud_probability: fraudProbability,
    risk_level: prediction.risk_level ?? (isFraud ? "high" : "low"),
    is_fraud: isFraud,
    amount: toNumber(prediction.amt ?? prediction.amount),
    merchant: prediction.merchant,
    category: prediction.category,
    action: prediction.action,
    risk_score:
      prediction.risk_score !== undefined ? toNumber(prediction.risk_score) : undefined,
  };
}

function normalizeFraudResponse(raw: RawFraudApiResponse): FraudAnalysisResponse {
  const threshold = raw.threshold ?? 0.65;
  const predictions = raw.predictions.map((prediction, index) =>
    normalizePrediction(prediction, threshold, index)
  );

  const fraudCount = predictions.filter((prediction) => prediction.is_fraud).length;
  const total = predictions.length;
  const probabilities = predictions.map((prediction) => prediction.fraud_probability);
  const amounts = predictions.map((prediction) => prediction.amount ?? 0);
  const fraudAmounts = predictions
    .filter((prediction) => prediction.is_fraud)
    .map((prediction) => prediction.amount ?? 0);

  const riskDistribution = predictions.reduce<FraudAnalysisResponse["risk_distribution"]>(
    (acc, prediction) => {
      acc[prediction.risk_level] = (acc[prediction.risk_level] ?? 0) + 1;
      return acc;
    },
    { low: 0, medium: 0, high: 0, critical: 0 }
  );

  return {
    total_transactions: raw.total_transactions ?? total,
    threshold,
    fraud_count: fraudCount,
    fraud_rate: total > 0 ? fraudCount / total : 0,
    avg_fraud_probability:
      total > 0
        ? probabilities.reduce((sum, probability) => sum + probability, 0) / total
        : 0,
    risk_distribution: riskDistribution,
    predictions,
    summary_stats: {
      total_amount: amounts.reduce((sum, amount) => sum + amount, 0),
      fraud_amount: fraudAmounts.reduce((sum, amount) => sum + amount, 0),
      avg_amount:
        total > 0 ? amounts.reduce((sum, amount) => sum + amount, 0) / total : 0,
      max_fraud_probability: probabilities.length > 0 ? Math.max(...probabilities) : 0,
    },
  };
}

/**
 * Read a CSV file in the browser and send it to the real external FastAPI backend.
 * Your backend expects: POST /predict_batch with JSON { transactions: [...] }.
 */
export async function predictFraudBatch(
  file: File
): Promise<FraudAnalysisResponse> {
  const baseUrl = getFraudApiUrl();
  if (!baseUrl) {
    throw new Error(
      "Fraud detection API is not configured. Set NEXT_PUBLIC_FRAUD_API_URL."
    );
  }

  const transactions = await csvFileToTransactions(file);

  const rawResponse = await postJson<RawFraudApiResponse, { transactions: Record<string, unknown>[] }>(
    `${baseUrl}/predict_batch`,
    { transactions }
  );

  return normalizeFraudResponse(rawResponse);
}

export function downloadFraudResults(data: FraudAnalysisResponse): void {
  const headers = [
    "transaction_id",
    "merchant",
    "category",
    "amount",
    "fraud_probability",
    "risk_score",
    "risk_level",
    "action",
    "is_fraud",
  ];
  const rows = data.predictions.map((prediction) =>
    [
      prediction.transaction_id,
      prediction.merchant ?? "",
      prediction.category ?? "",
      prediction.amount ?? "",
      prediction.fraud_probability.toFixed(4),
      prediction.risk_score ?? "",
      prediction.risk_level,
      prediction.action ?? "",
      prediction.is_fraud,
    ].join(",")
  );
  const csv = [headers.join(","), ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "fraud_predictions.csv";
  a.click();
  URL.revokeObjectURL(url);
}
