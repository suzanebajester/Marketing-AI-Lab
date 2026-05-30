import { createFileRoute } from "@tanstack/react-router";
import { Mail, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Marketing AI Lab" },
      { name: "description", content: "Get in touch with the Marketing AI Lab team." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <div className="bg-gradient-soft py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated px-3 py-1 text-xs font-medium">
            <Sparkles className="h-3 w-3 text-primary" /> Contact
          </div>
          <h1 className="mt-4 font-display text-4xl font-bold sm:text-5xl">Let's talk marketing AI</h1>
          <p className="mt-4 text-muted-foreground">Questions, partnerships, or feedback — we'd love to hear from you.</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            <ContactCard icon={<Mail className="h-5 w-5" />} title="Email" value="hello@marketingailab.com" />
            <ContactCard icon={<Linkedin className="h-5 w-5" />} title="LinkedIn" value="@marketingailab" />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Thanks! We'll be in touch."); }}
            className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Name</Label>
                <Input className="mt-1.5" required placeholder="Jane Doe" />
              </div>
              <div>
                <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Email</Label>
                <Input className="mt-1.5" type="email" required placeholder="jane@company.com" />
              </div>
            </div>
            <div>
              <Label className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Message</Label>
              <Textarea className="mt-1.5" rows={6} required placeholder="How can we help?" />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full">Send message</Button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon, title, value }: { icon: React.ReactNode; title: string; value: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">{icon}</div>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</div>
        <div className="font-semibold">{value}</div>
      </div>
    </div>
  );
}
