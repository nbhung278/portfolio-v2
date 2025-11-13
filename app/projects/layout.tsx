import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Browse my portfolio of web development projects built with React, Next.js, Node.js, TypeScript, AWS, and modern technologies. Full-stack applications showcasing my skills and expertise.",
  openGraph: {
    title: "Projects | Hung Nguyen Portfolio",
    description:
      "Browse my portfolio of web development projects built with modern technologies.",
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
