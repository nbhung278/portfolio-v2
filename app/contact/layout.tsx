import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me",
  description:
    "Get in touch with Hung Nguyen for web development projects, freelance work, or job opportunities. Available for remote collaboration worldwide. Let's build something amazing together.",
  keywords: [
    "Contact Developer",
    "Hire Full-stack Developer",
    "Freelance Web Developer",
    "Remote Developer",
    "Web Development Services",
    "React Developer for Hire",
    "Node.js Developer Contact",
    "Vietnam Developer",
  ],
  openGraph: {
    title: "Contact Me | Hung Nguyen - Full-stack Developer",
    description:
      "Get in touch for web development projects, freelance work, or collaboration opportunities. Available for remote work worldwide.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Hung Nguyen | Full-stack Developer",
    description:
      "Reach out for web development projects or collaboration. Available for remote work worldwide.",
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
