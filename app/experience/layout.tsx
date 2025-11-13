import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experience",
  description:
    "Explore my professional experience as a full-stack web developer. 4 years of building scalable applications with Node.js, ReactJS, Laravel, Next.js, NestJS, AWS, and Docker.",
  openGraph: {
    title: "Experience | Hung Nguyen Portfolio",
    description:
      "Explore my professional experience as a full-stack web developer with 4 years of expertise.",
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
