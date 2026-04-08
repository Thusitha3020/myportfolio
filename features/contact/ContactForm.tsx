"use client";

import { useRef, useState } from "react";
import { Send, Mail, MapPin, CheckCircle } from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const inputClass = cn(
  "w-full bg-[hsl(var(--muted))] border border-[hsl(var(--border))]",
  "rounded-xl px-4 py-3 text-sm text-[hsl(var(--foreground))]",
  "placeholder:text-[hsl(var(--muted-foreground)/0.6)]",
  "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary)/0.5)] focus:border-[hsl(var(--primary)/0.6)]",
  "transition-all duration-200"
);

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate form submission (replace with EmailJS or server action)
    await new Promise((r) => setTimeout(r, 1500));

    // Note: Replace the following with real EmailJS call:
    // await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY)

    setIsLoading(false);
    setSent(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <SectionWrapper
      id="contact"
      className="py-24 lg:py-32 px-6 container mx-auto max-w-5xl"
    >
      {/* Header */}
      <AnimatedContainer animation="fadeUp" className="text-center mb-14">
        <span className="text-sm font-mono text-[hsl(var(--primary))] tracking-widest uppercase">
          04. Contact
        </span>
        <h2 className="font-display font-bold text-4xl sm:text-5xl text-[hsl(var(--foreground))] mt-3">
          Get In <span className="gradient-text">Touch</span>
        </h2>
        <p className="text-[hsl(var(--muted-foreground))] mt-4 max-w-lg mx-auto leading-relaxed">
          Have a project in mind or want to discuss opportunities? I&apos;d love
          to hear from you.
        </p>
      </AnimatedContainer>

      <div className="grid lg:grid-cols-5 gap-12">
        {/* Left info */}
        <AnimatedContainer animation="slideLeft" className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl glass border border-[hsl(var(--border)/0.5)] space-y-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary)/0.15)] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[hsl(var(--primary))]" />
              </div>
              <div>
                <p className="font-medium text-sm text-[hsl(var(--foreground))]">
                  Email
                </p>
                <a
                  href="mailto:alex@example.com"
                  className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--primary))] transition-colors"
                >
                  alex@example.com
                </a>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[hsl(var(--secondary)/0.15)] flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[hsl(var(--secondary))]" />
              </div>
              <div>
                <p className="font-medium text-sm text-[hsl(var(--foreground))]">
                  Location
                </p>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                  San Francisco, CA — Available remotely
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass border border-[hsl(var(--border)/0.5)]">
            <p className="text-sm font-medium text-[hsl(var(--foreground))] mb-2">
              Response time
            </p>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">
              I typically respond within{" "}
              <span className="text-[hsl(var(--primary))] font-semibold">
                24 hours
              </span>
              . Looking forward to our conversation.
            </p>
          </div>
        </AnimatedContainer>

        {/* Right form */}
        <AnimatedContainer animation="slideRight" className="lg:col-span-3">
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center py-16 gap-5 text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="font-display font-bold text-2xl text-[hsl(var(--foreground))]">
                Message Sent!
              </h3>
              <p className="text-[hsl(var(--muted-foreground))] max-w-xs">
                Thanks for reaching out. I&apos;ll get back to you shortly.
              </p>
              <Button variant="outline" onClick={() => setSent(false)}>
                Send another message
              </Button>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-4"
              noValidate
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[hsl(var(--muted-foreground))] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={6}
                  placeholder="Tell me about your project..."
                  value={form.message}
                  onChange={handleChange}
                  className={cn(inputClass, "resize-none")}
                />
              </div>

              {error && (
                <p className="text-sm text-red-400" role="alert">
                  {error}
                </p>
              )}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={isLoading}
                rightIcon={<Send className="w-4 h-4" />}
                className="w-full"
              >
                {isLoading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </AnimatedContainer>
      </div>
    </SectionWrapper>
  );
}
