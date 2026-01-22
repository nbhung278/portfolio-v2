"use client";

import { memo } from "react";
import { motion } from "motion/react";
import { cardStyles, skillBadgeStyles } from "@/lib/styles";
import { fadeInUp } from "@/lib/animations";

interface SkillCardProps {
	title: string;
	skills: string[];
}

const SkillCard = memo(({ title, skills }: SkillCardProps) => {
	return (
		<motion.div
			className={cardStyles.full}
			variants={fadeInUp}
			transition={{ duration: 0.4 }}
			whileHover={{ y: -5 }}
		>
			<h3 className="mb-4 text-lg font-semibold text-foreground">{title}</h3>
			<div className="flex flex-wrap gap-2">
				{skills.map((skill, i) => (
					<motion.span
						key={skill}
						className={skillBadgeStyles.full}
						initial={{ opacity: 0, scale: 0.8 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={{ once: true }}
						transition={{ duration: 0.2, delay: i * 0.05 }}
						whileHover={{ scale: 1.05 }}
					>
						{skill}
					</motion.span>
				))}
			</div>
		</motion.div>
	);
});

SkillCard.displayName = "SkillCard";

export default SkillCard;
