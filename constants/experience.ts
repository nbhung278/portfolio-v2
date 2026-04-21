export interface WorkExperience {
	id: string;
	company: string;
	position: string;
	period: string;
	location?: string;
	description: string;
	responsibilities: string[];
	technologies: string[];
	current?: boolean;
}

export interface Certification {
	id: string;
	name: string;
	issuer: string;
	date: string;
	expiryDate?: string;
	credentialId?: string;
	credentialUrl?: string;
	logo?: string;
	featured?: boolean;
}

export const certifications: Certification[] = [
	{
		id: "aws-dva",
		name: "AWS Certified Developer – Associate",
		issuer: "Amazon Web Services (AWS)",
		date: "July 11, 2025",
		expiryDate: "July 11, 2028",
		credentialUrl:
			"https://www.credly.com/badges/9d330d7a-f6bb-4ac1-8f22-b303e79c83d6",
		logo: "/images/aws-dva-1.png",
		featured: true,
	},
	{
		id: "anthropic-claude-code",
		name: "Claude Code in Action",
		issuer: "Anthropic",
		date: "February 3, 2026",
		credentialId: "kscryj99qx4o",
		credentialUrl: "https://verify.skilljar.com/c/kscryj99qx4o",
		logo: "/images/claude-cer.png",
		featured: true,
	},
];

export const workExperiences: WorkExperience[] = [
	{
		id: "avada-chatty",
		company: "Avada Group",
		position: "Full-Stack Developer",
		period: "March 2024 - Present",
		current: true,
		description:
			"Chatty AI Chatbot & Live Chat — #1 result for \"Chat\" on Shopify App Store, 4.9★ (1,761 reviews), \"Built for Shopify\". A comprehensive customer support solution for Shopify merchants with live chat, AI chatbot, Messenger integration, FAQs, and help center.",
		responsibilities: [
			"Developed and maintained a high-traffic Shopify app serving thousands of merchants globally, integrating live chat, AI chatbot, helpdesk, FAQ, and WhatsApp into a single platform",
			"Integrated OpenAI GPT-4o and Weaviate vector database to power a context-aware AI chatbot capable of product recommendations, order tracking, and automated customer support",
			"Built a unified omni-channel inbox aggregating conversations from WhatsApp, Facebook Messenger, Instagram, and Email using real-time SocketIO",
			"Optimized app to handle large merchant catalogs (up to 20,000 products) for AI training; implemented Redis caching and Google Cloud Pub/Sub for message queuing",
			"Led full Facebook Messenger integration, including OAuth flow, webhook handling, and real-time messaging",
			"Collaborated with a team of 20 members using agile methodologies",
		],
		technologies: [
			"React",
			"Koa.js",
			"Google Cloud",
			"Firebase Firestore",
			"Shopify",
			"MUI",
			"Shopify Polaris",
			"OpenAI API",
			"Weaviate",
			"Redis",
			"SocketIO",
			"Pub/Sub",
		],
	},
	{
		id: "freelance-insida",
		company: "Freelancer",
		position: "Full-Stack Developer",
		period: "July 2024 - Present",
		current: true,
		description:
			"Freelance developer for Insida App - a real estate social networking platform based in Australia, connecting buyers and sellers for transparent property transactions.",
		responsibilities: [
			"Collaborated directly with Australian clients to deliver full-cycle web solutions, covering both frontend and backend development",
			"Implemented property listing with detailed information (location, rooms, land size) and real-time chat & negotiation system",
			"Built RESTful APIs with Node.js and MongoDB, deployed and managed infrastructure on AWS with Docker containers",
			"Integrated Redis for session management and caching to improve performance",
			"Collaborated with backend teams via Redux Saga and SocketIO for real-time notifications",
		],
		technologies: [
			"Next.js",
			"Node.js",
			"Redis",
			"Docker",
			"AWS",
			"MongoDB",
			"MUI",
			"Redux Saga",
			"SocketIO",
		],
	},
	{
		id: "emso-social",
		company: "EMSO JSC",
		position: "Frontend Developer",
		period: "June 2023 - March 2024",
		description:
			"Frontend developer for Emso Social Network - a Vietnamese social networking platform with features including chat, livestream, music, e-commerce, and investment.",
		responsibilities: [
			"Maintained and developed the marketplace module (e-commerce platform)",
			"Implemented order management system for users",
			"Integrated payment gateways for bank and credit card transactions",
			"Worked with microservices architecture using React and Redux Saga",
			"Collaborated with 25 team members in an agile environment",
		],
		technologies: [
			"ReactJS",
			"Redux",
			"Redux Saga",
			"Material UI",
			"Firebase",
			"TypeScript",
			"SocketIO",
			"Microservices",
		],
	},
	{
		id: "emso-easyedu",
		company: "EMSO JSC",
		position: "Frontend Developer",
		period: "March 2023 - Present",
		current: true,
		description:
			"Frontend developer for EasyEdu - a management solution platform for foreign language centers with microservice architecture (EasyEdu, EasyFinance, EasyCustomer, EasyChat, EasySpace).",
		responsibilities: [
			"Developed new features and improved UI/UX",
			"Fixed bugs and optimized application performance",
			"Worked with Drupal backend and React frontend integration",
			"Collaborated with a team of 15 developers",
		],
		technologies: [
			"Drupal",
			"ReactJS",
			"Firebase",
			"Github",
			"Axios",
			"Redux",
			"Material UI",
		],
	},
	{
		id: "cssoft-vietrace",
		company: "CSsoft JSC",
		position: "Full-Stack Developer",
		period: "November 2022 - March 2023",
		description:
			"Full-stack developer for Vietrace - software for the Trade Promotion Department of the Ministry of Industry and Trade.",
		responsibilities: [
			"Developed government trade promotion software features",
			"Built RESTful APIs using Node.js and Express.js",
			"Implemented frontend features with React and React Query",
			"Deployed applications using Docker",
			"Worked with a team of 10 developers",
		],
		technologies: [
			"Node.js",
			"ExpressJS",
			"ReactJS",
			"React Query",
			"Axios",
			"TypeScript",
			"Docker",
			"Tailwind",
		],
	},
	{
		id: "cssoft-itrace",
		company: "CSsoft JSC",
		position: "Full-Stack Developer",
		period: "November 2022 - March 2023",
		description:
			"Full-stack developer for Itrace 247 - product traceability software for tracking origin information of fruits and agricultural products.",
		responsibilities: [
			"Developed customer-requested features for product tracking system",
			"Built frontend and backend functionalities using Laravel",
			"Updated and maintained existing codebase",
			"Fixed bugs and conducted testing",
		],
		technologies: ["Bootstrap", "Ajax", "jQuery", "Laravel 8.x"],
	},
	{
		id: "cssoft-molisa",
		company: "CSsoft JSC",
		position: "Backend Developer",
		period: "October 2021 - March 2023",
		description:
			"Backend developer for Molisa - government software under the Ministry of Labor, War Invalids, and Social Affairs for receiving and processing feedback from citizens and representatives.",
		responsibilities: [
			"Developed backend features for feedback processing system",
			"Implemented customer-requested features",
			"Updated and maintained government software",
			"Fixed bugs and conducted thorough testing",
			"Collaborated with a team of 17 developers",
		],
		technologies: ["Bootstrap", "Ajax", "jQuery", "Laravel 8.x"],
	},
];

export const skills = {
	languages: ["JavaScript", "TypeScript"],
	frontend: [
		"React",
		"Next.js",
		"Redux",
		"Redux Saga",
		"Zustand",
		"Material UI",
		"TailwindCSS",
		"Shadcn",
	],
	backend: [
		"Node.js",
		"Nest.js",
		"Express.js",
		"Koa.js",
		"Laravel",
		"GraphQL",
		"RESTful API",
	],
	database: [
		"PostgreSQL",
		"MongoDB",
		"Firebase Firestore",
		"Redis",
		"DynamoDB",
		"AWS RDS",
	],
	cloud: ["AWS", "Google Cloud", "Firebase"],
	ai: [
		"OpenAI API (GPT-4o)",
		"Weaviate",
		"Claude",
		"AWS Bedrock",
		"Shopify API",
	],
	testing: ["Jest", "React Testing Library", "Playwright"],
	tools: [
		"Docker",
		"Git",
		"Github",
		"Gitlab",
		"Shopify",
		"CI/CD",
		"Microservices",
	],
};
