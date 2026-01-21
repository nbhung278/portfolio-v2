import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hung Nguyen. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.",
  openGraph: {
    title: "Contact | Hung Nguyen Portfolio",
    description:
      "Get in touch with Hung Nguyen for new projects and opportunities.",
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
