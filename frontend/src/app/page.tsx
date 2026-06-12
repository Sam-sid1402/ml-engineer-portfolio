import Link from "next/link";
import {
  ArrowRight,
  Github,
  Linkedin,
  Brain,
  Code2,
  Database,
  LineChart,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import ProjectCard from "@/components/projects/ProjectCard";
import { SITE, SKILLS, PROJECTS } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-50" />
        <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent" />
        <PageContainer className="relative py-24 sm:py-32">
          <div className="max-w-3xl animate-fade-in">
            <Badge variant="accent" className="mb-6">
              <Brain className="h-3 w-3 mr-1" />
              Open to Junior ML Engineer Roles
            </Badge>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-foreground">
              {SITE.name}
            </h1>
            <p className="mt-4 text-xl sm:text-2xl text-gradient font-semibold">
              {SITE.title}
            </p>
            <p className="mt-6 text-lg text-muted leading-relaxed max-w-2xl">
              I build practical machine learning applications from raw data to deployment,
including feature engineering, model training, evaluation, FastAPI inference
services, and Dockerized APIs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="/projects" size="lg">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="lg" href="/demos/fraud-detection">
                Fraud Detection Demo
              </Button>
              <Button variant="ghost" size="lg" href={SITE.github} external>
                <Github className="h-4 w-4" />
                GitHub
              </Button>
              <Button variant="ghost" size="lg" href={SITE.linkedin} external>
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      <Section className="border-t border-border bg-surface/50">
        <PageContainer>
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              {
                icon: Code2,
                title: "End-to-End ML",
                description:
                  "Data preprocessing, feature engineering, model training, and rigorous evaluation before deployment.",
              },
              {
                icon: Database,
                title: "ML API Deployment",
                description:
                  "FastAPI inference services and Docker containerization for reproducible, portable model serving.",
              },
              {
                icon: LineChart,
                title: "Measurable Impact",
                description:
                  "Evaluation with ROC-AUC, F1, precision-recall tradeoffs, and business-aligned metrics.",
              },
            ].map((item) => (
              <Card key={item.title} hover>
                <item.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted mt-2 leading-relaxed">
                  {item.description}
                </p>
              </Card>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <SectionHeader
            title="Projects"
            subtitle="Two end-to-end ML systems with documented training pipelines, evaluation metrics, and deployment architecture."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-hover transition-colors font-medium"
            >
              View project details & architecture
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </PageContainer>
      </Section>

      <Section className="border-t border-border bg-surface/50">
        <PageContainer>
          <SectionHeader
            title="Tech Stack"
            subtitle="Tools and technologies used across ML projects."
            centered
          />
          <div className="flex flex-wrap justify-center gap-3">
            {SKILLS.map((skill) => (
              <Badge key={skill} variant="primary" className="text-sm px-4 py-1.5">
                {skill}
              </Badge>
            ))}
          </div>
        </PageContainer>
      </Section>

      <Section>
        <PageContainer>
          <Card glow className="text-center py-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
              Open to ML Engineering Opportunities
            </h2>
            <p className="mt-4 text-muted max-w-xl mx-auto">
              I&apos;m actively seeking Machine Learning Engineer opportunities.
              Reach out to discuss projects, collaborations, or open roles.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button href="/contact" size="lg">
                Get in Touch
              </Button>
              <Button variant="secondary" size="lg" href={SITE.linkedin} external>
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </Button>
            </div>
          </Card>
        </PageContainer>
      </Section>
    </>
  );
}
