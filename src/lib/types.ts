export type RiskLevel = "low" | "medium" | "high" | "critical" | string;

export interface FraudPrediction {
  transaction_id: string;
  fraud_probability: number;
  risk_level: RiskLevel;
  is_fraud: boolean;
  amount?: number;
  merchant?: string;
  category?: string;
  action?: string;
  risk_score?: number;
}

export interface FraudAnalysisResponse {
  total_transactions: number;
  threshold: number;
  fraud_count: number;
  fraud_rate: number;
  avg_fraud_probability: number;
  risk_distribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
    [key: string]: number;
  };
  predictions: FraudPrediction[];
  summary_stats: {
    total_amount: number;
    fraud_amount: number;
    avg_amount: number;
    max_fraud_probability: number;
  };
}

export interface RawFraudApiPrediction {
  trans_num?: string;
  transaction_id?: string;
  merchant?: string;
  category?: string;
  amt?: number | string;
  amount?: number | string;
  fraud_probability?: number | string;
  prediction?: number | boolean | string;
  risk_score?: number | string;
  risk_level?: RiskLevel;
  action?: string;
}

export interface RawFraudApiResponse {
  total_transactions: number;
  threshold: number;
  predictions: RawFraudApiPrediction[];
}

export interface ExoplanetInput {
  star_metallicity: number;
  star_mass_solar_units: number;
  star_age_billion_years: number;
  surface_gravity_log: number;
  star_radius_solar_units: number;
  star_temperature_kelvin: number;
  star_luminosity_log: number;
}

export interface ExoplanetPrediction {
  prediction: "host" | "no_host";
  probability: number;
  confidence: "low" | "medium" | "high";
  feature_importance: {
    feature: string;
    importance: number;
  }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ApiError {
  detail: string | { message?: string; error?: string; missing_columns?: string[] };
}
