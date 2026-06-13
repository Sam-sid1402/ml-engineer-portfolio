"use client";

import { useState } from "react";
import { Download, Shield, AlertCircle, ServerOff } from "lucide-react";
import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FileUpload from "@/components/demos/FileUpload";
import FraudResults from "@/components/demos/FraudResults";
import {
  predictFraudBatch,
  downloadFraudResults,
  isFraudApiConfigured,
  getFraudApiUrl,
} from "@/lib/api";
import type { FraudAnalysisResponse } from "@/lib/types";

export default function FraudDetectionDemoPage() {
  const [results, setResults] = useState<FraudAnalysisResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [manualTransaction, setManualTransaction] = useState({
  trans_num: "manual_transaction_001",
  trans_date_trans_time: "2020-06-21 12:14:25",
  cc_num: 2291163933867244,
  merchant: "fraud_Kirlin and Sons",
  category: "personal_care",
  amt: "250",
  first: "John",
  last: "Doe",
  gender: "M",
  street: "123 Main St",
  city: "Madrid",
  state: "MD",
  zip: 28001,
  lat: 40.4168,
  long: -3.7038,
  city_pop: 3000000,
  job: "Engineer",
  dob: "1988-01-01",
  merch_lat: 40.45,
  merch_long: -3.69,
});
  const [error, setError] = useState<string | null>(null);
  const apiConfigured = isFraudApiConfigured();

  const handleFileSelect = async (file: File) => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const data = await predictFraudBatch(file);
      setResults(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to reach the fraud detection API."
      );
    } finally {
      setLoading(false);
    }
  };
const handleManualSubmit = async () => {
  setLoading(true);
  setError(null);
  setResults(null);

  try {
    const transaction = {
      ...manualTransaction,
      amt: Number(manualTransaction.amt),
      lat: Number(manualTransaction.lat),
      long: Number(manualTransaction.long),
      zip: Number(manualTransaction.zip),
      city_pop: Number(manualTransaction.city_pop),
      merch_lat: Number(manualTransaction.merch_lat),
      merch_long: Number(manualTransaction.merch_long),
    };

    const headers = Object.keys(transaction);
    const values = Object.values(transaction).map((value) =>
      typeof value === "string" ? `"${value.replaceAll('"', '""')}"` : String(value)
    );

    const csv = `${headers.join(",")}\n${values.join(",")}`;
    const file = new File([csv], "manual_transaction.csv", {
      type: "text/csv",
    });

    const data = await predictFraudBatch(file);
    setResults(data);
  } catch (err) {
    setError(
      err instanceof Error
        ? err.message
        : "Failed to reach the fraud detection API."
    );
  } finally {
    setLoading(false);
  }
};
  return (
    <Section className="pt-8">
      <PageContainer>
        <SectionHeader
          title="Fraud Detection Demo"
subtitle="Upload transaction data and analyze fraud risk using my XGBoost-based fraud detection system deployed with FastAPI and Docker."        />

        <div className="flex flex-wrap gap-3 mb-8">
          <Badge variant="primary">
            <Shield className="h-3 w-3 mr-1" />
            XGBoost Model
          </Badge>
<Badge variant="accent">FastAPI + Docker</Badge>
<Badge variant="default">Batch Inference</Badge>        </div>
<div className="flex flex-wrap gap-3 mb-8 text-sm text-muted">
  <span>ROC-AUC: 0.997</span>
  <span>•</span>
  <span>F1: 0.861</span>
  <span>•</span>
  <span>50k+ Batch Predictions Supported</span>
</div>
        {!apiConfigured && (
          <Card className="mb-8 border-warning/30">
            <div className="flex items-start gap-3 text-warning">
              <ServerOff className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">Inference Service Unavailable</p>
                <p className="text-sm text-muted mt-1">
                  Set{" "}
                  <code className="text-xs bg-surface-elevated px-1.5 py-0.5 rounded">
                    NEXT_PUBLIC_FRAUD_API_URL
                  </code>{" "}
                  to your deployed fraud detection FastAPI service to enable
                  this demo.
                </p>
              </div>
            </div>
          </Card>
        )}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Analyze Single Transaction</CardTitle>
          </CardHeader>

          <p className="text-sm text-muted mb-6">
            Enter transaction details manually and send one transaction to the deployed FastAPI backend.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              type="number"
              value={manualTransaction.amt}
              onChange={(e) =>
              setManualTransaction({
                ...manualTransaction,
                amt: e.target.value,
              })
            }
              placeholder="Amount"
            />

            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={manualTransaction.merchant}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  merchant: e.target.value,
                })
              }
              placeholder="Merchant"
            />

            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={manualTransaction.category}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  category: e.target.value,
                })
              }
              placeholder="Category"
            />

            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={manualTransaction.job}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  job: e.target.value,
                })
              }
              placeholder="Customer job"
            />

            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={manualTransaction.trans_date_trans_time}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  trans_date_trans_time: e.target.value,
                })
              }
              placeholder="Transaction datetime"
            />

            <input
              className="rounded-lg border border-border bg-surface px-3 py-2 text-sm"
              value={manualTransaction.dob}
              onChange={(e) =>
                setManualTransaction({
                  ...manualTransaction,
                  dob: e.target.value,
                })
              }
              placeholder="Date of birth"
            />
          </div>

          <Button
            onClick={handleManualSubmit}
            disabled={!apiConfigured || loading}
          >
            Analyze Transaction
          </Button>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Transaction Data</CardTitle>
          </CardHeader>
          <p className="text-sm text-muted mb-6">
            CSV is sent to external API. Predictions are generated by the deployed FastAPI backend using an XGBoost model trained on over 1.2 million transactions.
          </p>
          <FileUpload
            onFileSelect={handleFileSelect}
            loading={loading}
            disabled={!apiConfigured}
          />
        </Card>

        {error && (
          <Card className="mb-8 border-danger/30">
            <div className="flex items-start gap-3 text-danger">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Request Failed</p>
                <p className="text-sm mt-1 opacity-80">{error}</p>
              </div>
            </div>
          </Card>
        )}

        {results && (
          <>
            <div className="flex justify-end mb-6">
              <Button
                variant="secondary"
                onClick={() => downloadFraudResults(results)}
              >
                <Download className="h-4 w-4" />
                Download Predictions CSV
              </Button>
            </div>
            <FraudResults data={results} />
          </>
        )}
      </PageContainer>
    </Section>
  );
}
