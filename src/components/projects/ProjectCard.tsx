import { Github, ArrowRight, CheckCircle2 } from "lucide-react";
import Card, { CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface ProjectCardProps {
  title: string;
  description: string;
  highlights?: readonly string[];
  metrics: readonly { label: string; value: string }[];
  tech: readonly string[];
  github: string | null;
  demoHref: string | null;
}

export default function ProjectCard({
  title,
  description,
  highlights,
  metrics,
  tech,
  github,
  demoHref,
}: ProjectCardProps) {
  return (
    <Card hover glow className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>

      {highlights && highlights.length > 0 && (
        <ul className="space-y-2 mb-6">
          {highlights.map((item) => (
            <li key={item} className="flex items-start gap-2 text-sm text-muted">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-2 gap-3 mb-6">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-lg bg-surface-elevated p-3 text-center"
          >
            <p className="text-lg font-bold text-foreground font-mono">
              {metric.value}
            </p>
            <p className="text-xs text-muted">{metric.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {tech.map((t) => (
          <Badge key={t} variant="primary">
            {t}
          </Badge>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-3">
        {github && (
          <Button variant="secondary" size="sm" href={github} external>
            <Github className="h-4 w-4" />
            GitHub
          </Button>
        )}
        {demoHref && (
          <Button variant="primary" size="sm" href={demoHref}>
            Live Demo
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}
