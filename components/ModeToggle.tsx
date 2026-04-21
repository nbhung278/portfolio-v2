import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

const RIPPLE_DURATION = 400;

export default function ModeToggle() {
	const { resolvedTheme, setTheme } = useTheme();
	const triggerRef = useRef<HTMLButtonElement>(null);

	const animateThemeChange = useCallback(
		async (nextTheme: string) => {
			if (typeof document === "undefined" || !triggerRef.current) {
				setTheme(nextTheme);
				return;
			}

			type DocumentWithTransitions = Document & {
				startViewTransition?: (callback: () => void) => {
					ready: Promise<void>;
				};
			};

			const doc = document as DocumentWithTransitions;

			if (!doc.startViewTransition) {
				setTheme(nextTheme);
				return;
			}

			const transition = doc.startViewTransition(() => {
				flushSync(() => {
					setTheme(nextTheme);
				});
			});

			await transition.ready;

			const { top, left, width, height } =
				triggerRef.current.getBoundingClientRect();
			const x = left + width / 2;
			const y = top + height / 2;
			const maxRadius = Math.hypot(
				Math.max(x, window.innerWidth - x),
				Math.max(y, window.innerHeight - y)
			);

			document.documentElement.animate(
				{
					clipPath: [
						`circle(0px at ${x}px ${y}px)`,
						`circle(${maxRadius}px at ${x}px ${y}px)`,
					],
				},
				{
					duration: RIPPLE_DURATION,
					easing: "ease-in-out",
					pseudoElement: "::view-transition-new(root)",
				}
			);
		},
		[setTheme]
	);

	const handleToggle = useCallback(() => {
		if (!resolvedTheme) return;
		const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
		animateThemeChange(nextTheme);
	}, [animateThemeChange, resolvedTheme]);

	return (
		<Button
			ref={triggerRef}
			variant="outline"
			size="icon"
			onClick={handleToggle}
			className="relative h-10 w-10 cursor-pointer rounded-lg bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
			aria-label="Toggle theme"
		>
			<Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
			<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
