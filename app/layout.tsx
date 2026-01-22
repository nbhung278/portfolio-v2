import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ViewportProvider } from "@/components/providers/viewport-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { Analytics } from "@vercel/analytics/next";

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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://hungnb.dev";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: "Hung Nguyen - Full-stack Web Developer | React, Node.js, AWS Expert",
		template: "%s | Hung Nguyen - Full-stack Developer",
	},
	description:
		"Hung Nguyen is a Full-stack Web Developer with 4+ years of experience. Expert in React, Next.js, Node.js, NestJS, TypeScript, AWS, and Docker. Building scalable, high-performance web applications.",
	keywords: [
		"Full-stack Developer",
		"Web Developer",
		"React Developer",
		"Next.js Developer",
		"Node.js Developer",
		"NestJS Developer",
		"AWS Certified Developer",
		"TypeScript Developer",
		"JavaScript Developer",
		"Frontend Developer",
		"Backend Developer",
		"Software Engineer",
		"Hung Nguyen",
		"Vietnam Developer",
		"Hanoi Developer",
		"Remote Developer",
		"Freelance Developer",
	],
	authors: [{ name: "Hung Nguyen", url: siteUrl }],
	creator: "Hung Nguyen",
	publisher: "Hung Nguyen",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	alternates: {
		canonical: siteUrl,
	},
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteUrl,
		siteName: "Hung Nguyen Portfolio",
		title: "Hung Nguyen - Full-stack Web Developer | React, Node.js, AWS Expert",
		description:
			"Full-stack web developer with 4+ years of experience. Expert in React, Next.js, Node.js, NestJS, TypeScript, AWS, and Docker. View my projects and experience.",
		images: [
			{
				url: "/og-image.png",
				width: 1200,
				height: 630,
				alt: "Hung Nguyen - Full-stack Web Developer Portfolio",
				type: "image/png",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "Hung Nguyen - Full-stack Web Developer",
		description:
			"Full-stack developer with 4+ years of experience in React, Next.js, Node.js, AWS. View my portfolio and projects.",
		images: ["/og-image.png"],
	},
	robots: {
		index: true,
		follow: true,
		nocache: false,
		googleBot: {
			index: true,
			follow: true,
			noimageindex: false,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	category: "technology",
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "Person",
	name: "Hung Nguyen",
	alternateName: "Nguyễn Bá Hưng",
	jobTitle: "Full-stack Web Developer",
	description:
		"Full-stack Web Developer with 4+ years of experience specializing in React, Next.js, Node.js, NestJS, TypeScript, AWS, and Docker.",
	url: siteUrl,
	image: `${siteUrl}/images/avatar.jpeg`,
	email: "nbhung278@gmail.com",
	telephone: "+84857560008",
	address: {
		"@type": "PostalAddress",
		addressLocality: "Hanoi",
		addressCountry: "Vietnam",
	},
	sameAs: [
		"https://github.com/nbhung278",
		"https://www.facebook.com/hungnb.dev/",
	],
	knowsAbout: [
		"React",
		"Next.js",
		"Node.js",
		"NestJS",
		"TypeScript",
		"JavaScript",
		"AWS",
		"Docker",
		"GraphQL",
		"PostgreSQL",
		"MongoDB",
		"Redis",
	],
	hasCredential: {
		"@type": "EducationalOccupationalCredential",
		credentialCategory: "certification",
		name: "AWS Certified Developer",
	},
	alumniOf: {
		"@type": "CollegeOrUniversity",
		name: "Electric Power University",
		address: {
			"@type": "PostalAddress",
			addressLocality: "Hanoi",
			addressCountry: "Vietnam",
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="h-full" suppressHydrationWarning>
			<head>
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
			</head>
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
								<Analytics />
							</main>
						</div>
					</ThemeProvider>
				</ViewportProvider>
			</body>
		</html>
	);
}
