"use client";

import { memo } from "react";
import { Building2, Calendar, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { cardStyles } from "@/lib/styles";
import { WorkExperience } from "@/constants/experience";

interface ExperienceCardProps {
	experience: WorkExperience;
}

const ExperienceCard = memo(({ experience }: ExperienceCardProps) => {
	return (
		<div
			className={cn(
				"relative group flex gap-6 pb-8",
				"before:absolute before:left-[11px] before:top-8 before:h-full before:w-0.5 before:bg-border/50"
			)}
		>
			<div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
				<div
					className={cn(
						"h-2 w-2 rounded-full bg-primary",
						experience.current && "animate-pulse"
					)}
				/>
			</div>

			<div className="flex-1 pb-6">
				<div
					className={cn(
						cardStyles.full,
						"hover:scale-[1.01]"
					)}
				>
					<div className="mb-4">
						<div className="mb-2 flex items-start justify-between gap-4">
							<div>
								<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
									{experience.position}
								</h3>
								<div className="mt-1 flex items-center gap-2 text-base font-medium text-foreground">
									<Building2 className="h-4 w-4" />
									{experience.company}
								</div>
							</div>
							{experience.current && (
								<span className="shrink-0 rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600 dark:text-green-400 border border-green-500/20">
									Current
								</span>
							)}
						</div>

						<div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
							<div className="flex items-center gap-1">
								<Calendar className="h-3.5 w-3.5" />
								<span>{experience.period}</span>
							</div>
							{experience.location && (
								<>
									<span className="text-muted-foreground/50">•</span>
									<div className="flex items-center gap-1">
										<MapPin className="h-3.5 w-3.5" />
										<span>{experience.location}</span>
									</div>
								</>
							)}
						</div>
					</div>

					<p className="mb-4 text-sm text-muted-foreground leading-relaxed">
						{experience.description}
					</p>

					<div className="mb-4">
						<h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-foreground">
							Key Responsibilities
						</h4>
						<ul className="space-y-2">
							{experience.responsibilities.map((responsibility, index) => (
								<li
									key={index}
									className="flex items-start text-sm text-muted-foreground leading-relaxed"
								>
									<span className="mr-2 mt-0.5 text-primary">•</span>
									<span>{responsibility}</span>
								</li>
							))}
						</ul>
					</div>

					<div>
						<h4 className="mb-2.5 text-xs font-semibold uppercase tracking-wide text-foreground">
							Technologies Used
						</h4>
						<div className="flex flex-wrap gap-1.5">
							{experience.technologies.map((tech) => (
								<span
									key={tech}
									className="rounded-md border border-border/50 bg-secondary/60 px-2.5 py-1 text-xs text-secondary-foreground"
								>
									{tech}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
});

ExperienceCard.displayName = "ExperienceCard";

export default ExperienceCard;
