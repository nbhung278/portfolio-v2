export interface Project {
	id: string;
	title: string;
	company: string;
	period: string;
	description: string;
	website?: string;
	repo?: string;
	repoServer?: string;
	technologies: string[];
	responsibilities: string[];
	teamSize: number;
	status: "completed" | "in-progress" | "personal";
	featured?: boolean;
}

export const projects: Project[] = [
	{
		id: "chatty-app",
		title: "Chatty AI Chatbot & Live Chat",
		company: "Avada Group",
		period: "3/2024 - Now",
		description:
			"#1 result for \"Chat\" on Shopify App Store · 4.9★ (1,761 reviews) · \"Built for Shopify\". Support that grows with your business: Live chat, AI chatbot, Messenger chat, FAQs, and help center.",
		website: "https://apps.shopify.com/chatty",
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
		responsibilities: [
			"Developed and maintained a high-traffic Shopify app serving thousands of merchants globally, integrating live chat, AI chatbot, helpdesk, FAQ, and WhatsApp into a single platform",
			"Integrated OpenAI GPT-4o and Weaviate vector database to power a context-aware AI chatbot capable of product recommendations, order tracking, and automated customer support",
			"Built a unified omni-channel inbox aggregating conversations from WhatsApp, Facebook Messenger, Instagram, and Email using real-time SocketIO",
			"Optimized app to handle large merchant catalogs (up to 20,000 products) for AI training; implemented Redis caching and Google Cloud Pub/Sub for message queuing",
			"Led full Facebook Messenger integration, including OAuth flow, webhook handling, and real-time messaging",
		],
		teamSize: 20,
		status: "in-progress",
		featured: true,
	},
	{
		id: "insida-app",
		title: "Insida App",
		company: "Freelancer",
		period: "7/2024 - Now",
		description:
			"Insida is a web-based social networking app focused on real estate, primarily in Australia. It connects buyers and sellers directly, making property transactions faster and more transparent. Users can chat in real-time, negotiate prices, and access detailed property information — including exact location, number of rooms, land size, and more — all in one place.",
		website: "https://insidaapp.com/",
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
		responsibilities: [
			"Worked as a freelance developer for a project based in Australia, collaborating directly with Australian clients",
			"Delivered full-cycle web solutions, covering both frontend and backend development responsibilities",
			"Implemented property listing with detailed information (location, rooms, land size) and real-time chat & negotiation system",
			"Built RESTful APIs with Node.js and MongoDB, deployed and managed infrastructure on AWS with Docker containers",
			"Integrated Redis for session management and caching to improve performance",
		],
		teamSize: 10,
		status: "in-progress",
		featured: true,
	},
	{
		id: "whale-social-network",
		title: "Whale Social Network",
		company: "Personal Project",
		period: "12/2023 - Now",
		description:
			"A personal project inspired by livestream and social network apps. Backend built with NestJS, GraphQL, Prisma, and Docker; frontend with Next.js and TypeScript. UI uses Shadcn, Zustand for state management, SocketIO for real-time features.",
		website: "In progress",
		repo: "https://github.com/nbhung278/Whale-SN-Client",
		repoServer: "https://github.com/nbhung278/Whale-SN-Server",
		technologies: [
			"NestJS",
			"Next.js",
			"GraphQL",
			"Prisma",
			"PostgreSQL",
			"Zustand",
			"TypeScript",
			"SocketIO",
			"Shadcn",
			"Docker",
		],
		responsibilities: [
			"Full-stack development of a social network platform with livestream functionality",
			"Designed and implemented backend architecture with NestJS, GraphQL, Prisma ORM and PostgreSQL",
			"Built real-time features using SocketIO and GraphQL subscriptions",
			"Developed responsive frontend with Next.js, Shadcn UI, and Zustand for state management",
		],
		teamSize: 1,
		status: "in-progress",
		featured: true,
	},
	{
		id: "emso-social-network",
		title: "Emso Social Network",
		company: "EMSO JSC",
		period: "6/2023 - 3/2024",
		description:
			"This is a social networking site aimed at Vietnamese people. It includes features such as chatting, livestreaming, music, e-commerce, investment, and more.",
		website: "https://cmc-fe.emso.vn/",
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
		responsibilities: [
			"Maintained the marketplace/e-commerce module of a large-scale Vietnamese social network (microservice architecture, 25-member team)",
			"Implemented order management, user order flows, and payment integrations with Vietnamese banks and credit cards",
			"Collaborated with backend teams via Redux Saga and SocketIO for real-time notifications",
		],
		teamSize: 25,
		status: "completed",
		featured: false,
	},
	{
		id: "easyedu-app",
		title: "EasyEdu App",
		company: "EMSO JSC",
		period: "3/2023 - Now",
		description:
			"This is a website that provides management solutions for foreign language centers. Developed according to microservice architecture, divided into many subsystems: EasyEdu, EasyFinance, EasyCustomer, EasyChat, EasySpace.",
		website: "https://easyedu.vn",
		technologies: [
			"Drupal",
			"ReactJS",
			"Firebase",
			"Github",
			"Axios",
			"Redux",
			"Material UI",
		],
		responsibilities: [
			"Frontend Developer - Develop new features, UI/UX, fix bugs",
		],
		teamSize: 15,
		status: "in-progress",
		featured: false,
	},
	{
		id: "vietrace",
		title: "Vietrace",
		company: "CSsoft JSC",
		period: "11/2022 - 3/2023",
		description:
			"Software for the Trade Promotion Department of the Ministry of Industry and Trade.",
		website: "https://vietrade.gov.vn",
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
		responsibilities: [
			"Full-stack Developer - Developed features for government trade promotion software",
		],
		teamSize: 10,
		status: "completed",
		featured: false,
	},
	{
		id: "itrace247",
		title: "Itrace 247",
		company: "CSsoft JSC",
		period: "11/2022 - 3/2023",
		description:
			"Software to retrieve product information, information about the origin of fruits and products such as place of growing, variety, place of growing, certification.",
		website: "https://itrace247.com",
		technologies: ["Bootstrap", "Ajax", "jQuery", "Laravel 8.x"],
		responsibilities: [
			"Backend/Frontend Developer - Develop customer-requested features, update and develop projects, fix bugs and test projects",
		],
		teamSize: 4,
		status: "completed",
		featured: false,
	},
	{
		id: "molisa",
		title: "Molisa",
		company: "CSsoft JSC",
		period: "10/2021 - 3/2023",
		description:
			"Software to receive and process feedback and recommendations from people, businesses, voters, and national assembly representatives. The software is under the management of the Ministry of Labor, War Invalids, and Social Affairs.",
		website: "https://www.molisa.gov.vn",
		technologies: ["Bootstrap", "Ajax", "jQuery", "Laravel 8.x"],
		responsibilities: [
			"Backend Developer - Develop customer-requested features, update and develop projects, fix bugs and test projects",
		],
		teamSize: 17,
		status: "completed",
		featured: false,
	},
];
