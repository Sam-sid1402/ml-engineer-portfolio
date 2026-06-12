import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import Badge from "@/components/ui/Badge";
import ExoplanetForm from "@/components/demos/ExoplanetForm";
import { Star } from "lucide-react";

export const metadata = {
  title: "Exoplanet Host Classification Demo",
};

export default function ExoplanetDemoPage() {
  return (
    <Section className="pt-8">
      <PageContainer>
        <SectionHeader
          title="Exoplanet Host Star Classification"
          subtitle="Estimate how similar a star is to known exoplanet-host stars using stellar parameters and my FastAPI inference service."
        />

        <div className="flex flex-wrap gap-3 mb-8">
          <Badge variant="primary">
            <Star className="h-3 w-3 mr-1" />
            XGBoost Model
          </Badge>
          <Badge variant="accent">FastAPI + Docker</Badge>
          <Badge variant="default">Gaia DR3 + NASA Exoplanet Archive</Badge>
        </div>

        <ExoplanetForm />
      </PageContainer>
    </Section>
  );
}