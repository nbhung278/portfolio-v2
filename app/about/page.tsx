"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
	Award,
	BookOpen,
	Code2,
	GraduationCap,
	Heart,
	Rocket,
} from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react";

export default function AboutPage() {
	const education = {
		institution: "Electric Power University",
		period: "August 2018 - March 2023",
		degree: "Bachelor's Degree",
		major: "Information Technology / E-commerce",
		achievements: [
			"Achieved good results in many specialized information technology subjects, such as database and web programming",
			"Foreign language certificate equivalent to a B2 certificate",
		],
	};

	const interests = [
		{
			icon: Code2,
			title: "Clean Code",
			description:
				"Passionate about writing maintainable, scalable, and well-documented code following best practices.",
		},
		{
			icon: Rocket,
			title: "Performance",
			description:
				"Always looking for ways to optimize application performance and user experience.",
		},
		{
			icon: BookOpen,
			title: "Learning",
			description:
				"Constantly learning new technologies and staying updated with industry trends.",
		},
		{
			icon: Heart,
			title: "Problem Solving",
			description:
				"Enjoy tackling complex problems and finding elegant solutions to technical challenges.",
		},
	];

	return (
		<div className="relative min-h-screen w-full overflow-hidden py-20 md:py-28">
			{/* Background Pattern */}
			<DotPattern
				width={20}
				height={20}
				cx={1}
				cy={1}
				cr={1}
				className={cn(
					"mask-[radial-gradient(600px_circle_at_center,white,transparent)]"
				)}
			/>

			{/* Content */}
			<div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
				{/* Header */}
				<motion.div
					className="mb-16 text-center"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
						About Me
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						A passionate full-stack developer dedicated to building exceptional
						digital experiences
					</p>
				</motion.div>

				{/* Profile Section */}
				<motion.div
					className="mb-16 rounded-xl border bg-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] md:p-12"
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<div className="flex flex-col gap-8 md:flex-row md:items-start">
						{/* Profile Image */}
						<motion.div
							className="flex shrink-0 justify-center md:justify-start"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5, delay: 0.3 }}
						>
							<div className="relative h-48 w-48 overflow-hidden rounded-2xl border-4 border-primary/20">
								<div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
									<Image
										src="/images/avatar.jpeg"
										fill
										alt="avatar"
										className="object-cover object-center"
									/>
								</div>
							</div>
						</motion.div>

						{/* Bio */}
						<motion.div
							className="flex-1 space-y-4"
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
						>
							<h2 className="text-2xl font-bold text-foreground">
								Nguyễn Bá Hưng
							</h2>
							<p className="text-lg font-medium text-primary">
								Full-Stack Developer
							</p>
							<div className="space-y-3 text-muted-foreground leading-relaxed">
								<p>
									I am a web developer with over 4 years of experience,
									including more than 1 year in backend development using
									Laravel and around 3 years specializing in Node.js and
									ReactJS.
								</p>
								<p>
									I have a strong grasp of architectural design, UX/UI
									principles, and software design patterns. My experience spans
									frontend and backend technologies, including Next.js, NestJS,
									Docker, Redis, and Pub/Sub, enabling me to build scalable,
									high-performance, and maintainable systems.
								</p>
								<p>
									I also work with cloud platforms such as Firebase and AWS,
									implement CI/CD pipelines, and design serverless architectures
									to deliver secure and efficient cloud-native applications.
								</p>
							</div>
						</motion.div>
					</div>
				</motion.div>

				{/* Education Section */}
				<motion.div
					className="mb-16"
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
				>
					<div className="mb-6 flex items-center gap-3">
						<GraduationCap className="h-6 w-6 text-primary" />
						<h2 className="text-3xl font-bold text-foreground">Education</h2>
					</div>
					<motion.div
						className="rounded-xl border bg-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
						whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
						transition={{ duration: 0.3 }}
					>
						<div className="mb-4">
							<h3 className="text-xl font-bold text-foreground">
								{education.institution}
							</h3>
							<p className="text-sm text-muted-foreground">
								{education.period}
							</p>
						</div>
						<div className="mb-4">
							<p className="text-base font-medium text-foreground">
								{education.degree} - {education.major}
							</p>
						</div>
						<div>
							<h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
								Achievements
							</h4>
							<ul className="space-y-2">
								{education.achievements.map((achievement, index) => (
									<motion.li
										key={index}
										className="flex items-start text-sm text-muted-foreground leading-relaxed"
										initial={{ opacity: 0, x: -20 }}
										whileInView={{ opacity: 1, x: 0 }}
										viewport={{ once: true }}
										transition={{ duration: 0.3, delay: index * 0.1 }}
									>
										<span className="mr-2 mt-0.5 text-primary">•</span>
										<span>{achievement}</span>
									</motion.li>
								))}
							</ul>
						</div>
					</motion.div>
				</motion.div>

				{/* Interests & Passions */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: "-100px" }}
					transition={{ duration: 0.5 }}
				>
					<div className="mb-6 flex items-center gap-3">
						<Award className="h-6 w-6 text-primary" />
						<h2 className="text-3xl font-bold text-foreground">
							Interests & Passions
						</h2>
					</div>
					<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
						{interests.map((interest, index) => {
							const Icon = interest.icon;
							return (
								<motion.div
									key={index}
									className="group rounded-xl border bg-background p-6 transition-colors duration-300 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
									initial={{ opacity: 0, y: 30 }}
									whileInView={{ opacity: 1, y: 0 }}
									viewport={{ once: true, margin: "-50px" }}
									transition={{ duration: 0.4, delay: index * 0.1 }}
									whileHover={{ y: -8, boxShadow: "0 25px 50px rgba(0,0,0,0.15)" }}
								>
									<motion.div
										className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary"
										whileHover={{ scale: 1.15, rotate: 5 }}
										transition={{ duration: 0.2 }}
									>
										<Icon className="h-6 w-6" />
									</motion.div>
									<h3 className="mb-2 text-lg font-semibold text-foreground">
										{interest.title}
									</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">
										{interest.description}
									</p>
								</motion.div>
							);
						})}
					</div>
				</motion.div>
			</div>
		</div>
	);
}
