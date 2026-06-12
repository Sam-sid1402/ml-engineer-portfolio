import Card from "@/components/ui/Card";

interface MetricCardProps {
  label: string;
  value: string;
  description?: string;
}

export default function MetricCard({ label, value, description }: MetricCardProps) {
  return (
    <Card className="text-center">
      <p className="text-2xl sm:text-3xl font-bold text-foreground font-mono">
        {value}
      </p>
      <p className="text-sm font-medium text-primary mt-1">{label}</p>
      {description && (
        <p className="text-xs text-muted mt-1">{description}</p>
      )}
    </Card>
  );
}
