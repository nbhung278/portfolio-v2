import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Portfolio",
  description:
    "Explore my portfolio of web development projects: E-commerce platforms, social networks, real-time applications. Built with React, Next.js, Node.js, NestJS, GraphQL, AWS, Docker, and more.",
  keywords: [
    "Web Development Projects",
    "Portfolio Projects",
    "React Projects",
    "Next.js Projects",
    "Node.js Projects",
    "E-commerce Development",
    "Full-stack Projects",
    "TypeScript Projects",
    "GraphQL Projects",
    "Real-time Applications",
  ],
  openGraph: {
    title: "Projects Portfolio | Hung Nguyen - Full-stack Developer",
    description:
      "Browse my portfolio: E-commerce platforms, social networks, real-time apps built with React, Next.js, Node.js, and modern technologies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects Portfolio | Hung Nguyen",
    description:
      "Explore my web development projects: E-commerce, social networks, and real-time applications.",
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsLayout({
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
