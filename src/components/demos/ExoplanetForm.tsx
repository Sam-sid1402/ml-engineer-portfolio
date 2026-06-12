"use client";

import { useState } from "react";
import { Loader2, Star, AlertCircle, ServerOff } from "lucide-react";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import {
  predictExoplanet,
  isExoplanetApiConfigured,
  getExoplanetApiUrl,
  getExoplanetPredictPath,
} from "@/lib/api";
import { formatPercent } from "@/lib/utils";
import type { ExoplanetInput, ExoplanetPrediction } from "@/lib/types";

const FORM_FIELDS: {
  key: keyof ExoplanetInput;
  label: string;
  unit: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
}[] = [
  { key: "star_metallicity", label: "Star Metallicity", unit: "[Fe/H]", min: -2.5, max: 1, step: 0.01, defaultValue: 0.1 },
  { key: "star_mass_solar_units", label: "Star Mass", unit: "Solar masses", min: 0.1, max: 5, step: 0.01, defaultValue: 1.0 },
  { key: "star_age_billion_years", label: "Star Age", unit: "Billion years", min: 0, max: 14, step: 0.1, defaultValue: 4.6 },
  { key: "surface_gravity_log", label: "Surface Gravity", unit: "log(g)", min: 0, max: 6, step: 0.01, defaultValue: 4.44 },
  { key: "star_radius_solar_units", label: "Star Radius", unit: "Solar radii", min: 0.1, max: 10, step: 0.01, defaultValue: 1.0 },
  { key: "star_temperature_kelvin", label: "Star Temperature", unit: "K", min: 2000, max: 10000, step: 10, defaultValue: 5778 },
  { key: "star_luminosity_log", label: "Star Luminosity", unit: "log(L/L☉)", min: -5, max: 5, step: 0.01, defaultValue: 0.0 },
];

const defaultValues = Object.fromEntries(
  FORM_FIELDS.map((f) => [f.key, f.defaultValue])
) as unknown as ExoplanetInput;

export default function ExoplanetForm() {
  const [form, setForm] = useState<ExoplanetInput>(defaultValues);
  const [result, setResult] = useState<ExoplanetPrediction | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiConfigured = isExoplanetApiConfigured();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiConfigured) return;

    setLoading(true);
    setError(null);
    try {
      const prediction = await predictExoplanet(form);
      setResult(prediction);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Prediction request failed");
    } finally {
      setLoading(false);
    }
  };

  const updateField = (key: keyof ExoplanetInput, value: string) => {
  setForm((prev) => ({
    ...prev,
    [key]: value === "" ? "" : Number(value),
    }));
  };

  if (!apiConfigured) {
    return (
      <Card className="border-warning/30">
        <div className="flex flex-col items-center text-center py-16 px-6">
          <ServerOff className="h-12 w-12 text-warning/60 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            Demo Currently Unavailable
          </h3>
          <p className="text-sm text-muted max-w-md leading-relaxed">
            The exoplanet classification API is not yet connected. When the
            FastAPI inference service is deployed, set{" "}
            <code className="text-xs bg-surface-elevated px-1.5 py-0.5 rounded">
              NEXT_PUBLIC_EXOPLANET_API_URL
            </code>{" "}
            to enable live predictions from this page.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Stellar & Planetary Parameters</CardTitle>
          <p className="text-sm text-muted mt-1">
            Parameters are sent to{" "}
            <code className="text-xs bg-surface-elevated px-1 py-0.5 rounded">
              {getExoplanetApiUrl()}
              {getExoplanetPredictPath()}
            </code>
            . Predictions are returned by the external backend.
          </p>
        </CardHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {FORM_FIELDS.map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-muted mb-1">
                  {field.label}
                  {field.unit && (
                    <span className="text-muted/60"> ({field.unit})</span>
                  )}
                </label>
                <input
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={form[field.key]}
                  onChange={(e) => updateField(field.key, e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            ))}
          </div>

          {error && (
            <div className="flex items-center gap-2 text-danger text-sm">
              <AlertCircle className="h-4 w-4" />
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Classifying...
              </>
            ) : (
              <>
                <Star className="h-4 w-4" />
                Predict Host Star
              </>
            )}
          </Button>
        </form>
      </Card>

      <div className="space-y-6">
        {result ? (
          <>
            <Card glow>
              <CardHeader>
                <CardTitle>Classification Result</CardTitle>
              </CardHeader>
              <div className="text-center py-6">
                <div
                  className={`inline-flex items-center gap-2 rounded-full px-6 py-3 text-lg font-semibold ${
                    result.prediction === "host"
                      ? "bg-success/20 text-success"
                      : "bg-muted/20 text-muted"
                  }`}
                >
                  <Star className="h-5 w-5" />
                  {result.prediction === "host"
                    ? "Exoplanet Host Star"
                    : "Not a Host Star"}
                </div>
                <p className="mt-4 text-3xl font-bold font-mono text-foreground">
                  {formatPercent(result.probability)}
                </p>
                <p className="text-sm text-muted">Host Probability</p>
                <Badge
                  variant={
                    result.confidence === "high"
                      ? "success"
                      : result.confidence === "medium"
                        ? "warning"
                        : "default"
                  }
                  className="mt-3"
                >
                  {result.confidence} confidence
                </Badge>
              </div>
            </Card>

            {result.feature_importance.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Feature Importance</CardTitle>
                </CardHeader>
                <div className="space-y-3">
                  {result.feature_importance.map((feat) => (
                    <div key={feat.feature}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted">{feat.feature}</span>
                        <span className="font-mono text-foreground">
                          {formatPercent(feat.importance, 0)}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-surface-elevated overflow-hidden">
                        <div
                          className="h-full rounded-full bg-primary transition-all"
                          style={{ width: `${feat.importance * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </>
        ) : (
          <Card className="flex flex-col items-center justify-center py-16 text-center">
            <Star className="h-12 w-12 text-muted/30 mb-4" />
            <p className="text-muted">
              Submit stellar parameters to request a classification from the API
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}
