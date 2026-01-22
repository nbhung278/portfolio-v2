"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import {
	Mail,
	Phone,
	Github,
	Facebook,
	Send,
	MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "motion/react";

export default function ContactPage() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const contactInfo = [
		{
			icon: Mail,
			label: "Email",
			value: "nbhung278@gmail.com",
			href: "mailto:nbhung278@gmail.com",
			color: "text-blue-600 dark:text-blue-400",
			bgColor: "bg-blue-500/10",
		},
		{
			icon: Phone,
			label: "Phone",
			value: "0857560008",
			href: "tel:0857560008",
			color: "text-green-600 dark:text-green-400",
			bgColor: "bg-green-500/10",
		},
		{
			icon: Github,
			label: "GitHub",
			value: "github.com/nbhung278",
			href: "https://github.com/nbhung278",
			color: "text-purple-600 dark:text-purple-400",
			bgColor: "bg-purple-500/10",
		},
		{
			icon: Facebook,
			label: "Facebook",
			value: "Nguyen Hung",
			href: "https://www.facebook.com/hungnb.dev/",
			color: "text-sky-600 dark:text-sky-400",
			bgColor: "bg-sky-500/10",
		},
	];

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		// Create mailto link with pre-filled data
		const mailtoLink = `mailto:nbhung278@gmail.com?subject=${encodeURIComponent(
			formData.subject || "Contact from Portfolio"
		)}&body=${encodeURIComponent(
			`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
		)}`;

		// Open mail client
		window.location.href = mailtoLink;

		// Reset form
		setFormData({
			name: "",
			email: "",
			subject: "",
			message: "",
		});
	};

	const handleQuickEmail = () => {
		window.location.href = "mailto:nbhung278@gmail.com";
	};

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
			<div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
				{/* Header */}
				<motion.div
					className="mb-16 text-center"
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
						Get In Touch
					</h1>
					<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
						I&apos;m always open to discussing new projects, creative ideas, or
						opportunities to be part of your vision.
					</p>
				</motion.div>

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
					{/* Contact Information */}
					<motion.div
						className="space-y-8"
						initial={{ opacity: 0, x: -30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div>
							<h2 className="mb-6 text-2xl font-bold text-foreground">
								Contact Information
							</h2>
							<div className="space-y-4">
								{contactInfo.map((item, index) => {
									const Icon = item.icon;
									return (
										<motion.div
											key={index}
											className="group flex items-start gap-4 rounded-xl border bg-background p-4 transition-colors duration-300 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
											whileHover={{ x: 5, boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}
										>
											<motion.div
												className={cn(
													"flex h-12 w-12 shrink-0 items-center justify-center rounded-lg",
													item.bgColor
												)}
												whileHover={{ scale: 1.1, rotate: 5 }}
												transition={{ duration: 0.2 }}
											>
												<Icon className={cn("h-5 w-5", item.color)} />
											</motion.div>
											<div className="flex-1 min-w-0">
												<p className="text-sm font-medium text-muted-foreground">
													{item.label}
												</p>
												{item.href ? (
													<a
														href={item.href}
														target={
															item.href.startsWith("http")
																? "_blank"
																: undefined
														}
														rel={
															item.href.startsWith("http")
																? "noopener noreferrer"
																: undefined
														}
														className="text-base font-medium text-foreground hover:text-primary transition-colors break-words"
													>
														{item.value}
													</a>
												) : (
													<p className="text-base font-medium text-foreground break-words">
														{item.value}
													</p>
												)}
											</div>
										</motion.div>
									);
								})}
							</div>
						</div>

						{/* Quick Actions */}
						<motion.div
							className="rounded-xl border bg-gradient-to-br from-primary/5 via-background to-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.6 }}
							whileHover={{ y: -5 }}
						>
							<div className="mb-4 flex items-center gap-2">
								<MessageSquare className="h-5 w-5 text-primary" />
								<h3 className="text-lg font-semibold text-foreground">
									Quick Contact
								</h3>
							</div>
							<p className="mb-6 text-sm text-muted-foreground">
								Want to reach out quickly? Click the button below to send me an
								email directly.
							</p>
							<Button onClick={handleQuickEmail} className="w-full" size="lg">
								<Mail className="mr-2 h-4 w-4" />
								Send Email Now
							</Button>
						</motion.div>
					</motion.div>

					{/* Contact Form */}
					<motion.div
						className="rounded-xl border bg-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
						initial={{ opacity: 0, x: 30 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.5, delay: 0.3 }}
					>
						<h2 className="mb-6 text-2xl font-bold text-foreground">
							Send a Message
						</h2>
						<form onSubmit={handleSubmit} className="space-y-6">
							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.4 }}
							>
								<label
									htmlFor="name"
									className="mb-2 block text-sm font-medium text-foreground"
								>
									Your Name
								</label>
								<input
									type="text"
									id="name"
									required
									value={formData.name}
									onChange={(e) =>
										setFormData({ ...formData, name: e.target.value })
									}
									className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
									placeholder="John Doe"
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.5 }}
							>
								<label
									htmlFor="email"
									className="mb-2 block text-sm font-medium text-foreground"
								>
									Your Email
								</label>
								<input
									type="email"
									id="email"
									required
									value={formData.email}
									onChange={(e) =>
										setFormData({ ...formData, email: e.target.value })
									}
									className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
									placeholder="john@example.com"
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.6 }}
							>
								<label
									htmlFor="subject"
									className="mb-2 block text-sm font-medium text-foreground"
								>
									Subject
								</label>
								<input
									type="text"
									id="subject"
									required
									value={formData.subject}
									onChange={(e) =>
										setFormData({ ...formData, subject: e.target.value })
									}
									className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow duration-200"
									placeholder="Project Inquiry"
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.7 }}
							>
								<label
									htmlFor="message"
									className="mb-2 block text-sm font-medium text-foreground"
								>
									Message
								</label>
								<textarea
									id="message"
									required
									value={formData.message}
									onChange={(e) =>
										setFormData({ ...formData, message: e.target.value })
									}
									rows={6}
									className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none transition-shadow duration-200"
									placeholder="Tell me about your project or inquiry..."
								/>
							</motion.div>

							<motion.div
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.3, delay: 0.8 }}
							>
								<Button type="submit" className="w-full" size="lg">
									<Send className="mr-2 h-4 w-4" />
									Send Message
								</Button>
							</motion.div>

							<p className="text-xs text-center text-muted-foreground">
								This will open your default email client with pre-filled
								information
							</p>
						</form>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
