import { ArrowRight } from "lucide-react";
import { FRAUD_ARCHITECTURE_STEPS } from "@/lib/constants";

export default function ArchitectureDiagram() {
  return (
    <div className="relative">
      <div className="grid gap-4 md:grid-cols-5 md:gap-2">
        {FRAUD_ARCHITECTURE_STEPS.map((step, index) => (
          <div key={step.title} className="relative flex flex-col items-center">
            <div className="w-full rounded-xl border border-border bg-surface-elevated p-4 text-center transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary/20 text-primary font-mono text-sm font-bold">
                {index + 1}
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {step.title}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {step.description}
              </p>
            </div>
            {index < FRAUD_ARCHITECTURE_STEPS.length - 1 && (
              <ArrowRight className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary/50 z-10" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-dashed border-border bg-surface/50 p-6">
        <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Batch CSV inference
          </span>
          <span className="hidden sm:inline text-border">|</span>
          <span>FastAPI + Docker deployment</span>
          <span className="hidden sm:inline text-border">|</span>
          <span>External model serving</span>
        </div>
      </div>
    </div>
  );
}
