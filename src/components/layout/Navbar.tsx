import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2" aria-label="Marketing AI Lab">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-display text-lg font-semibold tracking-tight">Marketing AI Lab</span>
        </Link>

        <Button variant="hero" size="sm" onClick={scrollToGenerator}>
          Generate My Campaign
        </Button>
      </div>
    </header>
  );
}
