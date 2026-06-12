import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function getRiskColor(level: string): string {
  switch (level) {
    case "low":
      return "text-success bg-success/10 border-success/30";
    case "medium":
      return "text-warning bg-warning/10 border-warning/30";
    case "high":
      return "text-orange-400 bg-orange-400/10 border-orange-400/30";
    default:
      return "text-muted bg-surface-elevated border-border";
  }
}

export function getRiskBadgeColor(level: string): string {
  switch (level) {
    case "low":
      return "bg-success/20 text-success";
    case "medium":
      return "bg-warning/20 text-warning";
    case "high":
      return "bg-orange-400/20 text-orange-400";
    default:
      return "bg-muted/20 text-muted";
  }
}
