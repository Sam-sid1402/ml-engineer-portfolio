import { GraduationCap, Briefcase, Target, ArrowRightLeft } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import { SKILLS } from "@/lib/constants";

export const metadata = {
  title: "About",
};

const TIMELINE = [
  {
    period: "2025 — Present",
    title: "Machine Learning Focus",
    description:
      "Self-directed learning and hands-on ML projects covering data preprocessing, feature engineering, model training, evaluation, and FastAPI deployment with Docker.",
    icon: GraduationCap,
  },
  {
    period: "2023 — 2025",
    title: "Customer Support & Hospitality",
    description:
      "Developed strong communication, problem-solving under pressure, and data-driven decision making in fast-paced customer-facing environments.",
    icon: Briefcase,
  },
];

const FOCUS_AREAS = [
  {
    title: "Machine Learning Engineering",
    description: "Built end-to-end ML systems including data preprocessing, feature engineering, model training, evaluation, and deployment.",
  },
  {
    title: "Production ML APIs",
    description: "Developed FastAPI inference services for real-time and batch predictions with Docker-based deployment.",
  },
  {
    title: "Applied Machine Learning",
    description: "Experience with classification problems, XGBoost, Random Forest, model tuning, cross-validation, and explainability techniques.",
  },
  {
    title: "Portfolio Projects",
    description: "Designed and deployed machine learning projects including Fraud Detection and Exoplanet Host Star Classification.",
  },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pt-8">
        <PageContainer>
          <SectionHeader
            title="About Me"
            subtitle="From customer support to machine learning, building practical ML applications from data to deployment."
          />

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <ArrowRightLeft className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Career Transition
                  </h3>
                </div>
                <div className="space-y-4 text-muted leading-relaxed">
                  <p>
                    My interest in machine learning grew from a passion for data and technology. Through self-study, online courses, and hands-on projects, I learned how to build machine learning solutions from data collection and feature engineering to model training, evaluation, and deployment.
                  </p>
                  <p>
                    Today, I focus on practical machine learning projects that solve real problems. My portfolio includes a real-time Fraud Detection System and an Exoplanet Host Star Classification project, both deployed through FastAPI and Docker. I enjoy building complete ML applications that combine data science, software engineering, and user-facing solutions.

                  </p>
                  <p>
                    My goal is to continue growing as a Machine Learning Engineer and contribute to projects where machine learning can create measurable business value.

                  </p>
                </div>
              </Card>

              <div className="space-y-4">
                {TIMELINE.map((item) => (
                  <Card key={item.title} hover>
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/20 text-primary">
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-accent">
                          {item.period}
                        </p>
                        <h3 className="text-lg font-semibold text-foreground mt-1">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="h-5 w-5 text-accent" />
                  <h3 className="text-lg font-semibold text-foreground">
                    Focus Areas
                  </h3>
                </div>
                <div className="space-y-4">
                  {FOCUS_AREAS.map((area) => (
                    <div key={area.title}>
                      <h4 className="text-sm font-semibold text-foreground">
                        {area.title}
                      </h4>
                      <p className="text-xs text-muted mt-1 leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SKILLS.map((skill) => (
                    <Badge key={skill} variant="primary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </PageContainer>
      </Section>
    </>
  );
}
