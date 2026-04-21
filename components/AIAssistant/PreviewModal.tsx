"use client";

import { X, ExternalLink, AlertCircle, Loader2 } from "lucide-react";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
	url: string;
	title: string;
	onClose: () => void;
}

export function PreviewModal({ url, title, onClose }: PreviewModalProps) {
	const [status, setStatus] = useState<"checking" | "loading" | "loaded" | "blocked">("checking");

	useEffect(() => {
		fetch(`/api/check-embed?url=${encodeURIComponent(url)}`)
			.then((r) => r.json())
			.then(({ embeddable }: { embeddable: boolean }) => {
				setStatus(embeddable ? "loading" : "blocked");
			})
			.catch(() => setStatus("blocked"));
	}, [url]);

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="fixed inset-0 bg-black/70 backdrop-blur-sm z-200 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<motion.div
				initial={{ opacity: 0, scale: 0.92, y: 16 }}
				animate={{ opacity: 1, scale: 1, y: 0 }}
				exit={{ opacity: 0, scale: 0.92, y: 16 }}
				transition={{ type: "spring", stiffness: 320, damping: 30 }}
				className={cn(
					"bg-card border border-border rounded-xl overflow-hidden",
					"w-full max-w-4xl h-[80vh]",
					"flex flex-col shadow-2xl"
				)}
				onClick={(e) => e.stopPropagation()}
			>
				{/* Browser chrome header */}
				<div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-muted/40 shrink-0">
					<div className="flex items-center gap-1.5">
						<button
							onClick={onClose}
							className="h-3 w-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors"
						/>
						<div className="h-3 w-3 rounded-full bg-yellow-400" />
						<div className="h-3 w-3 rounded-full bg-green-400" />
					</div>
					<div className="flex-1 min-w-0 bg-background border border-border/60 rounded-md px-3 py-1">
						<span className="text-xs text-muted-foreground truncate block">{url}</span>
					</div>
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						className={cn(
							"shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs",
							"bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
						)}
					>
						<ExternalLink className="h-3 w-3" />
						Open
					</a>
					<Button
						variant="ghost"
						size="icon"
						onClick={onClose}
						className="h-7 w-7 shrink-0 text-muted-foreground"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>

				{/* Content area */}
				<div className="flex-1 relative bg-white">
					{/* Checking / loading spinner */}
					{(status === "checking" || status === "loading") && (
						<div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-10">
							<Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
						</div>
					)}

					{/* Blocked fallback */}
					{status === "blocked" && (
						<div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/10 z-10 p-6 text-center">
							<AlertCircle className="h-12 w-12 text-muted-foreground/50" />
							<div className="space-y-1">
								<p className="font-medium text-foreground">Preview not available</p>
								<p className="text-sm text-muted-foreground max-w-xs">
									This site doesn&apos;t allow embedding. Open it directly in a new tab to view.
								</p>
							</div>
							<a
								href={url}
								target="_blank"
								rel="noopener noreferrer"
								className={cn(
									"flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium",
									"bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
								)}
							>
								<ExternalLink className="h-4 w-4" />
								Open {title}
							</a>
						</div>
					)}

					{/* Iframe — only mount after embeddability confirmed */}
					{(status === "loading" || status === "loaded") && (
						<iframe
							src={url}
							className="absolute inset-0 w-full h-full border-0"
							title={title}
							sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
							onLoad={() => setStatus("loaded")}
							onError={() => setStatus("blocked")}
						/>
					)}
				</div>
			</motion.div>
		</motion.div>
	);
}
