import { Link } from "@tanstack/react-router";
import { Sparkles, Linkedin, Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-hero">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-display text-sm font-bold leading-tight">Marketing AI Lab</div>
            <div className="text-xs text-muted-foreground">AI-powered marketing campaigns</div>
          </div>
        </Link>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Built by Suzane Bajester</span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/suzanebajester/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="https://github.com/suzanebajester"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
