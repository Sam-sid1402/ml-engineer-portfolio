import Link from "next/link";
import { Github, Linkedin, Mail, Brain } from "lucide-react";
import { SITE, NAV_LINKS } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Brain className="h-4 w-4" />
              </div>
              <span className="font-semibold text-foreground">{SITE.name}</span>
            </div>
            <p className="text-sm text-muted leading-relaxed">
              {SITE.title} focused on building practical ML applications, inference APIs, and deployable end-to-end solutions.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/demos/fraud-detection"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Fraud Detection Demo
                </Link>
              </li>
              <li>
                <Link
                  href="/demos/exoplanet"
                  className="text-sm text-muted hover:text-primary transition-colors"
                >
                  Exoplanet Demo
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border text-muted hover:text-foreground hover:border-primary/50 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <p className="text-xs text-muted mt-4">{SITE.location}</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js, TypeScript & external FastAPI services
          </p>
        </div>
      </div>
    </footer>
  );
}
