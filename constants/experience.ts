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
    logo: "/images/aws-dva-1.png",
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
      "Working on Chatty App - a comprehensive customer support solution for Shopify merchants with live chat, AI chatbot, Messenger integration, FAQs, and help center.",
    responsibilities: [
      "Development of a messaging support software for customers on the Shopify platform with Facebook integration",
      "Integrating AI chatbot using OpenAI API and Weaviate for intelligent product search and customer support",
      "Built scalable backend services using Koa.js with Firebase Firestore for real-time data synchronization",
      "Implemented Redis caching layer for improved performance and response times",
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
      "Collaborated directly with Australian clients to deliver full-cycle web solutions",
      "Developed both frontend and backend features for real-time chat and negotiation system",
      "Implemented property listing system with detailed information (location, rooms, land size)",
      "Built RESTful APIs with Node.js and MongoDB for scalable data management",
      "Deployed and managed application infrastructure on AWS with Docker containers",
      "Implemented Redis for session management and caching",
    ],
    technologies: [
      "Next.js",
      "Node.js",
      "Redis",
      "Docker",
      "AWS",
      "MongoDB",
      "MUI",
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
  database: ["PostgreSQL", "MongoDB", "Firebase Firestore", "Redis"],
  cloud: ["AWS", "Google Cloud", "Firebase"],
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
