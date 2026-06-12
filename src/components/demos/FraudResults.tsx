"use client";
import Button from "@/components/ui/Button";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { getRiskBadgeColor, formatPercent } from "@/lib/utils";
import type { FraudAnalysisResponse } from "@/lib/types";

const RISK_COLORS = {
  low: "#34d399",
  medium: "#fb923c",
  high: "#f87171",
  critical: "#f87171",
};

interface FraudResultsProps {
  data: FraudAnalysisResponse;
}

export default function FraudResults({ data }: FraudResultsProps) {
  const riskChartData = Object.entries(data.risk_distribution)
  .filter(([_, count]) => count > 0).map(
    ([level, count]) => ({
      name: level.charAt(0).toUpperCase() + level.slice(1),
      count,
      fill: RISK_COLORS[level as keyof typeof RISK_COLORS],
    })
  );

  const probBuckets = [
    { range: "0-25%", count: 0 },
    { range: "25-50%", count: 0 },
    { range: "50-75%", count: 0 },
    { range: "75-100%", count: 0 },
  ];
    const downloadResults = () => {
    const headers = [
      "transaction_id",
      "amount",
      "merchant",
      "fraud_probability",
      "risk_level",
      "is_fraud",
    ];

    const rows = data.predictions.map((p) =>
      headers.map((h) => {
        const value = p[h as keyof typeof p];
        return `"${String(value ?? "").replace(/"/g, '""')}"`;
      }).join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "fraud_predictions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };
  data.predictions.forEach((p) => {
    const prob = p.fraud_probability * 100;
    if (prob < 25) probBuckets[0].count++;
    else if (prob < 50) probBuckets[1].count++;
    else if (prob < 75) probBuckets[2].count++;
    else probBuckets[3].count++;
  });

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <p className="text-2xl font-bold text-foreground font-mono">
            {data.total_transactions.toLocaleString()}
          </p>
          <p className="text-sm text-muted">Total Transactions</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-danger font-mono">
            {data.fraud_count.toLocaleString()}
          </p>
          <p className="text-sm text-muted">Fraud Detected</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-warning font-mono">
            {formatPercent(data.fraud_rate)}
          </p>
          <p className="text-sm text-muted">Fraud Rate</p>
        </Card>
        <Card>
          <p className="text-2xl font-bold text-accent font-mono">
            {formatPercent(data.avg_fraud_probability)}
          </p>
          <p className="text-sm text-muted">Avg Fraud Probability</p>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Risk Level Distribution</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={riskChartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="count"
                label={({ name, count }) => `${name}: ${count}`}
              >
                {riskChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a26",
                  border: "1px solid #2a2a3a",
                  borderRadius: "8px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fraud Probability Distribution</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={probBuckets}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
              <XAxis dataKey="range" stroke="#94a3b8" fontSize={12} />
              <YAxis stroke="#94a3b8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1a1a26",
                  border: "1px solid #2a2a3a",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-xs text-muted">Total Amount</p>
            <p className="text-lg font-mono text-foreground">
              ${data.summary_stats.total_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Fraud Amount</p>
            <p className="text-lg font-mono text-danger">
              ${data.summary_stats.fraud_amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Avg Transaction</p>
            <p className="text-lg font-mono text-foreground">
              ${data.summary_stats.avg_amount.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted">Max Fraud Probability</p>
            <p className="text-lg font-mono text-warning">
              {formatPercent(data.summary_stats.max_fraud_probability)}
            </p>
          </div>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transaction Predictions</CardTitle>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-muted">
                <th className="pb-3 pr-4 font-medium">Transaction ID</th>
                <th className="pb-3 pr-4 font-medium">Amount</th>
                <th className="pb-3 pr-4 font-medium">Merchant</th>
                <th className="pb-3 pr-4 font-medium">Probability</th>
                <th className="pb-3 pr-4 font-medium">Risk Level</th>
                <th className="pb-3 font-medium">Fraud</th>
              </tr>
            </thead>
            <tbody>
              {data.predictions.slice(0, 20).map((pred) => (
                <tr
                  key={pred.transaction_id}
                  className="border-b border-border/50 hover:bg-surface-elevated/50"
                >
                  <td className="py-3 pr-4 font-mono text-xs">
                    {pred.transaction_id}
                  </td>
                  <td className="py-3 pr-4">
                    ${pred.amount?.toFixed(2) ?? "—"}
                  </td>
                  <td className="py-3 pr-4 text-muted">
                    {pred.merchant ?? "—"}
                  </td>
                  <td className="py-3 pr-4 font-mono">
                    {formatPercent(pred.fraud_probability)}
                  </td>
                  <td className="py-3 pr-4">
                    <Badge className={getRiskBadgeColor(pred.risk_level)}>
                      {pred.risk_level}
                    </Badge>
                  </td>
                  <td className="py-3">
                    {pred.is_fraud ? (
                      <span className="text-danger font-medium">Yes</span>
                    ) : (
                      <span className="text-success">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.predictions.length > 20 && (
            <div className="mt-4 flex flex-col items-center gap-3">
            <p className="text-xs text-muted text-center">
              Showing 20 of {data.predictions.length} transactions.
            </p>
            <Button type="button" onClick={downloadResults}>
              Download Full Results CSV
            </Button>
          </div>
            )}
        </div>
      </Card>
    </div>
  );
}
