import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import logo from "@/assets/marketing-ai-lab-logo.png.asset.json";

export function Navbar() {
  const scrollToGenerator = () => {
    document.getElementById("generator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center" aria-label="Marketing AI Lab">
          <img src={logo.url} alt="Marketing AI Lab" className="h-9 w-auto" />
        </Link>

        <Button variant="hero" size="sm" onClick={scrollToGenerator}>
          Generate My Campaign
        </Button>
      </div>
    </header>
  );
}
