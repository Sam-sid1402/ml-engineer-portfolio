"use client";

import { useState } from "react";
import { Mail, MapPin, Send, CheckCircle } from "lucide-react";
import Section, { PageContainer, SectionHeader } from "@/components/layout/Section";
import Card, { CardHeader, CardTitle } from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { SITE } from "@/lib/constants";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${SITE.email}?subject=${encodeURIComponent(
      form.subject
    )}&body=${encodeURIComponent(
      `From: ${form.name} (${form.email})\n\n${form.message}`
    )}`;
    window.location.href = mailtoLink;
    setStatus("success");
  };

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Section className="pt-8">
      <PageContainer>
        <SectionHeader
          title="Contact"
          subtitle="Interested in ML engineering roles, collaborations, or have questions about my projects? I'd love to hear from you."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <div className="space-y-4">
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-muted hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <span className="text-sm">{SITE.email}</span>
                </a>
                <div className="flex items-center gap-3 text-muted">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span className="text-sm">{SITE.location}</span>
                </div>
              </div>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <div className="space-y-3">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted hover:text-primary transition-colors"
                >
                  GitHub Profile →
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted hover:text-primary transition-colors"
                >
                  LinkedIn Profile →
                </a>
                <a
                  href="/demos/fraud-detection"
                  className="block text-sm text-muted hover:text-primary transition-colors"
                >
                  Fraud Detection Demo →
                </a>
                <a
                  href="/demos/exoplanet"
                  className="block text-sm text-muted hover:text-primary transition-colors"
                >
                  Exoplanet Demo →
                </a>
              </div>
            </Card>
          </div>

          <Card className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-muted mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => updateField("subject", e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="ML Engineer opportunity / Project inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-muted mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className="w-full rounded-lg border border-border bg-surface-elevated px-4 py-2.5 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
                  placeholder="Tell me about the opportunity or ask about my projects..."
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-2 text-success text-sm">
                  <CheckCircle className="h-4 w-4" />
                  Opening your email client...
                </div>
              )}

              <Button type="submit" size="lg">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </form>
          </Card>
        </div>
      </PageContainer>
    </Section>
  );
}
