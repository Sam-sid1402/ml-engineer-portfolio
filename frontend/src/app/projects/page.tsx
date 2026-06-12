import { ExternalLink } from "lucide-react";
import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import ProjectCard from "@/components/projects/ProjectCard";
import ArchitectureDiagram from "@/components/projects/ArchitectureDiagram";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { PROJECTS } from "@/lib/constants";

export const metadata = {
  title: "Projects",
};

export default function ProjectsPage() {
  const fraudProject = PROJECTS.find((p) => p.id === "fraud-detection")!;
  const exoplanetProject = PROJECTS.find((p) => p.id === "exoplanet")!;

  return (
    <>
      <Section className="pt-8">
        <PageContainer>
          <SectionHeader
            title="Projects"
            subtitle="End-to-end ML systems — from data preprocessing and model training to FastAPI deployment and Docker containerization."
          />

          <div className="space-y-16">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="accent">Project 1</Badge>
                <h2 className="text-2xl font-bold text-foreground">
                  {fraudProject.title}
                </h2>
              </div>
              <div className="grid gap-8 lg:grid-cols-2 mb-8">
                <ProjectCard {...fraudProject} />
                <Card>
                  <CardHeader>
                    <CardTitle>Live Demo</CardTitle>
                  </CardHeader>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    Upload a CSV of transaction data to the external FastAPI
                    inference service. Results include fraud probabilities, risk
                    levels, summary statistics, and downloadable predictions.
                  </p>
                  <Button href="/demos/fraud-detection">
                    Launch Fraud Detection Demo
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>System Architecture</CardTitle>
                </CardHeader>
                <ArchitectureDiagram />
              </Card>
            </div>

            <div className="border-t border-border pt-16">
              <div className="flex items-center gap-3 mb-6">
                <Badge variant="accent">Project 2</Badge>
                <h2 className="text-2xl font-bold text-foreground">
                  {exoplanetProject.title}
                </h2>
              </div>
              <div className="grid gap-8 lg:grid-cols-2">
                <ProjectCard {...exoplanetProject} />
                <Card>
                  <CardHeader>
                    <CardTitle>Live Prediction Form</CardTitle>
                  </CardHeader>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    Interactive demo for estimating how similar a star is to known exoplanet-host stars using stellar properties such as metallicity, mass, radius, temperature, luminosity, age, and surface gravity. The form sends inputs to FastAPI inference service and returns a host-likeness score.
                  </p>
                  <Button href="/demos/exoplanet">
                    View Exoplanet Demo
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Card>
              </div>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
