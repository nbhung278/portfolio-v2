"use client";

import React, { useState } from "react";
import { ExternalLink, Eye } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { projects } from "@/constants/projects";
import { cn } from "@/lib/utils";
import { PreviewModal } from "./PreviewModal";

// ─── Markdown parser ──────────────────────────────────────────────────────────

function parseInline(text: string, keyPrefix: string): React.ReactNode[] {
	// Order matters: markdown links before bare URLs
	const pattern =
		/(\[([^\]]+)\]\((https?:\/\/[^)]+)\))|(https?:\/\/[^\s,)>\]]+)|\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`/g;

	const nodes: React.ReactNode[] = [];
	let lastIndex = 0;
	let i = 0;
	let match: RegExpExecArray | null;

	while ((match = pattern.exec(text)) !== null) {
		if (match.index > lastIndex) {
			nodes.push(text.slice(lastIndex, match.index));
		}

		if (match[2] && match[3]) {
			// [text](url)
			nodes.push(
				<a
					key={`${keyPrefix}-${i++}`}
					href={match[3]}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors"
				>
					{match[2]}
				</a>
			);
		} else if (match[4]) {
			// bare URL
			nodes.push(
				<a
					key={`${keyPrefix}-${i++}`}
					href={match[4]}
					target="_blank"
					rel="noopener noreferrer"
					className="text-primary underline underline-offset-2 hover:text-primary/80 transition-colors break-all"
				>
					{match[4]}
				</a>
			);
		} else if (match[5]) {
			// **bold**
			nodes.push(<strong key={`${keyPrefix}-${i++}`}>{match[5]}</strong>);
		} else if (match[6]) {
			// *italic*
			nodes.push(<em key={`${keyPrefix}-${i++}`}>{match[6]}</em>);
		} else if (match[7]) {
			// `code`
			nodes.push(
				<code
					key={`${keyPrefix}-${i++}`}
					className="bg-primary/10 text-primary px-1 py-0.5 rounded text-[0.8em] font-mono"
				>
					{match[7]}
				</code>
			);
		}

		lastIndex = match.index + match[0].length;
	}

	if (lastIndex < text.length) {
		nodes.push(text.slice(lastIndex));
	}

	return nodes;
}

function renderMarkdown(content: string): React.ReactNode {
	const lines = content.split("\n");
	return lines.map((line, lineIdx) => {
		const isLast = lineIdx === lines.length - 1;
		const parsed = parseInline(line, `l${lineIdx}`);
		return (
			<React.Fragment key={lineIdx}>
				{parsed}
				{!isLast && <br />}
			</React.Fragment>
		);
	});
}

// ─── Project card matching ─────────────────────────────────────────────────────

interface KnownSite {
	url: string;
	title: string;
	company: string;
	description: string;
	tech: string[];
	id: string;
}

function buildKnownSites(): KnownSite[] {
	return projects
		.filter((p) => p.website && p.website !== "In progress")
		.map((p) => ({
			url: p.website!,
			title: p.title,
			company: p.company,
			description: p.description,
			tech: p.technologies.slice(0, 4),
			id: p.id,
		}));
}

const KNOWN_SITES = buildKnownSites();

function escapeRegExp(str: string): string {
	return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findMentionedProjects(text: string): KnownSite[] {
	const lowerText = text.toLowerCase();
	const seen = new Set<string>();
	return KNOWN_SITES.filter((site) => {
		try {
			const hostname = new URL(site.url).hostname.replace("www.", "");
			const idKeyword = site.id.split("-")[0];
			const keywordPattern = new RegExp(`\\b${escapeRegExp(idKeyword)}\\b`, "i");
			const mentioned =
				lowerText.includes(hostname) ||
				lowerText.includes(site.url.toLowerCase()) ||
				keywordPattern.test(text);
			if (mentioned && !seen.has(site.url)) {
				seen.add(site.url);
				return true;
			}
		} catch {
			/* ignore */
		}
		return false;
	});
}

// ─── Project Card ─────────────────────────────────────────────────────────────

function ProjectCard({
	site,
	onPreview,
}: {
	site: KnownSite;
	onPreview: (url: string, title: string) => void;
}) {
	return (
		<motion.div
			initial={{ opacity: 0, y: 6 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.25 }}
			className={cn(
				"mt-2 rounded-lg border border-border bg-background/60",
				"overflow-hidden text-sm"
			)}
		>
			<div className="px-3 pt-2.5 pb-2">
				<div className="flex items-start justify-between gap-2">
					<div className="min-w-0">
						<p className="font-semibold text-foreground leading-tight truncate">
							{site.title}
						</p>
						<p className="text-xs text-muted-foreground mt-0.5">{site.company}</p>
					</div>
				</div>
				<p className="text-xs text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
					{site.description}
				</p>
				<div className="flex flex-wrap gap-1 mt-2">
					{site.tech.map((t) => (
						<span
							key={t}
							className="px-1.5 py-0.5 rounded text-[10px] bg-primary/10 text-primary font-medium"
						>
							{t}
						</span>
					))}
				</div>
			</div>
			<div className="flex border-t border-border">
				<button
					onClick={() => onPreview(site.url, site.title)}
					className={cn(
						"flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium",
						"text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
					)}
				>
					<Eye className="h-3 w-3" />
					Preview
				</button>
				<div className="w-px bg-border" />
				<a
					href={site.url}
					target="_blank"
					rel="noopener noreferrer"
					className={cn(
						"flex-1 flex items-center justify-center gap-1.5 py-2 text-xs font-medium",
						"text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
					)}
				>
					<ExternalLink className="h-3 w-3" />
					Visit
				</a>
			</div>
		</motion.div>
	);
}

// ─── MessageContent ────────────────────────────────────────────────────────────

interface MessageContentProps {
	content: string;
}

export function MessageContent({ content }: MessageContentProps) {
	const [previewModal, setPreviewModal] = useState<{
		url: string;
		title: string;
	} | null>(null);

	const mentionedProjects = findMentionedProjects(content);

	return (
		<>
			<span className="whitespace-pre-wrap wrap-break-word">
				{renderMarkdown(content)}
			</span>

			{mentionedProjects.length > 0 && (
				<div className="space-y-1.5">
					{mentionedProjects.map((site) => (
						<ProjectCard
							key={site.url}
							site={site}
							onPreview={(url, title) => setPreviewModal({ url, title })}
						/>
					))}
				</div>
			)}

			<AnimatePresence>
				{previewModal && (
					<PreviewModal
						url={previewModal.url}
						title={previewModal.title}
						onClose={() => setPreviewModal(null)}
					/>
				)}
			</AnimatePresence>
		</>
	);
}
