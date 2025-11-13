import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewportProvider } from "@/components/providers/viewport-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import AIAssistant from "@/components/AIAssistant";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hung Nguyen - Full-stack Web Developer Portfolio",
    template: "%s | Hung Nguyen Portfolio",
  },
  description:
    "Full-stack web developer with 4 years of experience specializing in Node.js, ReactJS, Laravel, Next.js, NestJS, AWS, and Docker. Building scalable applications with modern technologies.",
  keywords: [
    "Full-stack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "AWS Certified",
    "TypeScript Developer",
    "Portfolio",
    "Hung Nguyen",
    "Hanoi Developer",
  ],
  authors: [{ name: "Hung Nguyen" }],
  creator: "Hung Nguyen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-domain.com",
    siteName: "Hung Nguyen Portfolio",
    title: "Hung Nguyen - Full-stack Web Developer Portfolio",
    description:
      "Full-stack web developer with 4 years of experience specializing in Node.js, ReactJS, Laravel, Next.js, NestJS, AWS, and Docker.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Hung Nguyen Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hung Nguyen - Full-stack Web Developer Portfolio",
    description:
      "Full-stack web developer with 4 years of experience specializing in Node.js, ReactJS, Laravel, Next.js, NestJS, AWS, and Docker.",
    creator: "@your-twitter-handle",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased bg-background text-foreground transition-colors"
        )}
      >
        <ViewportProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col pt-24 items-center">
              <main className="mx-auto w-full max-w-7xl px-4 md:w-4/5 lg:px-8 pt-[50px]">
                <Navbar />
                {children}
                <AIAssistant />
              </main>
            </div>
          </ThemeProvider>
        </ViewportProvider>
      </body>
    </html>
  );
}
