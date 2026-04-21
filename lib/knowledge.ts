import "server-only";
import fs from "fs";
import path from "path";
import {
	workExperiences,
	certifications,
	skills,
} from "@/constants/experience";
import { projects } from "@/constants/projects";

function readKnowledgeFiles(): string {
	const knowledgeDir = path.join(process.cwd(), "knowledge");
	if (!fs.existsSync(knowledgeDir)) return "";

	const files = fs.readdirSync(knowledgeDir).filter((f) => f.endsWith(".md"));
	return files
		.map((file) => {
			const content = fs.readFileSync(path.join(knowledgeDir, file), "utf-8");
			return `\n---\n${content}`;
		})
		.join("\n");
}

function buildExperienceContext(): string {
	const lines: string[] = ["\n## Work Experience\n"];
	for (const exp of workExperiences) {
		lines.push(`### ${exp.position} @ ${exp.company} (${exp.period})`);
		lines.push(exp.description);
		lines.push("Key contributions:");
		exp.responsibilities.forEach((r) => lines.push(`- ${r}`));
		lines.push(`Tech: ${exp.technologies.join(", ")}\n`);
	}
	return lines.join("\n");
}

function buildProjectsContext(): string {
	const featured = projects.filter((p) => p.featured);
	const lines: string[] = ["\n## Featured Projects\n"];
	for (const p of featured) {
		lines.push(`### ${p.title} (${p.company}, ${p.period})`);
		lines.push(p.description);
		lines.push("Responsibilities:");
		p.responsibilities.forEach((r) => lines.push(`- ${r}`));
		lines.push(`Tech: ${p.technologies.join(", ")}`);
		if (p.website && p.website !== "In progress")
			lines.push(`Website: ${p.website}`);
		lines.push("");
	}
	return lines.join("\n");
}

function buildSkillsContext(): string {
	return `
## Skills
- Languages: ${skills.languages.join(", ")}
- Frontend: ${skills.frontend.join(", ")}
- Backend: ${skills.backend.join(", ")}
- Database: ${skills.database.join(", ")}
- Cloud: ${skills.cloud.join(", ")}
- AI/ML: ${skills.ai.join(", ")}
- Testing: ${skills.testing.join(", ")}
- Tools: ${skills.tools.join(", ")}`;
}

function buildCertificationsContext(): string {
	return `
## Certifications
${certifications.map((c) => `- ${c.name} by ${c.issuer} (${c.date})`).join("\n")}`;
}

export function buildKnowledgeBase(): string {
	return [
		readKnowledgeFiles(),
		buildExperienceContext(),
		buildProjectsContext(),
		buildSkillsContext(),
		buildCertificationsContext(),
	].join("\n");
}
