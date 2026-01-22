export const cardStyles = {
	base: "rounded-xl border bg-background p-6",
	shadow:
		"[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
	darkShadow:
		"dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
	hover: "hover:shadow-xl transition-shadow duration-300",
	full: "rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300",
};

export const skillBadgeStyles = {
	base: "rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground",
	hover: "hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default",
	full: "rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default",
};
