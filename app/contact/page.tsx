import { createMetadata } from "@/lib/metadata";
import { ContactForm } from "@/features/contact/ContactForm";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Get in touch with Thusitha S. Perera — open to full-time roles, freelance projects, and collaborations.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen mesh-bg pt-20">
      <ContactForm />
    </div>
  );
}
