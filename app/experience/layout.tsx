import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience & Certifications",
  description:
    "4+ years of professional experience as a Full-stack Developer. AWS Certified, skilled in React, Next.js, Node.js, NestJS, TypeScript. View my work history, certifications, and technical skills.",
  keywords: [
    "Work Experience",
    "Professional Experience",
    "AWS Certification",
    "Full-stack Experience",
    "React Experience",
    "Node.js Experience",
    "Software Developer Resume",
    "Technical Skills",
  ],
  openGraph: {
    title: "Experience & Certifications | Hung Nguyen - Full-stack Developer",
    description:
      "4+ years of professional experience. AWS Certified Developer with expertise in React, Next.js, Node.js, NestJS, and cloud technologies.",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Experience & Certifications | Hung Nguyen",
    description:
      "4+ years as a Full-stack Developer. AWS Certified with expertise in modern web technologies.",
  },
  alternates: {
    canonical: "/experience",
  },
};

export default function ExperienceLayout({
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
