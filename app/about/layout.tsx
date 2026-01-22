import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Hung Nguyen - Full-stack Developer from Vietnam with 4+ years of experience. Bachelor's degree in IT, passionate about clean code, performance optimization, and modern web technologies.",
  keywords: [
    "About Hung Nguyen",
    "Full-stack Developer Vietnam",
    "Software Engineer Bio",
    "Web Developer Background",
    "Electric Power University",
    "IT Graduate",
    "Developer Profile",
    "Clean Code Advocate",
  ],
  openGraph: {
    title: "About Me | Hung Nguyen - Full-stack Developer",
    description:
      "Full-stack Developer from Vietnam with 4+ years of experience. Passionate about building scalable, high-performance web applications.",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Hung Nguyen | Full-stack Developer",
    description:
      "Full-stack Developer with 4+ years of experience, passionate about clean code and modern web technologies.",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutLayout({
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
