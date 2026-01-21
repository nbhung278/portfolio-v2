import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn more about Hung Nguyen - a passionate full-stack developer with 4 years of experience building scalable web applications with modern technologies.",
  openGraph: {
    title: "About | Hung Nguyen Portfolio",
    description:
      "Learn more about Hung Nguyen - a passionate full-stack developer.",
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
