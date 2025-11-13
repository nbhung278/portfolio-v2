import { useCallback, useRef } from "react";
import { flushSync } from "react-dom";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const RIPPLE_DURATION = 400;

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();
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

  const handleThemeSelect = useCallback(
    (nextTheme: "light" | "dark" | "system") => {
      if (nextTheme === theme) {
        return;
      }

      animateThemeChange(nextTheme);
    },
    [animateThemeChange, theme]
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={triggerRef}
          variant="outline"
          size="icon"
          className="relative h-10 w-10 cursor-pointer rounded-lg bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
          aria-label="Toggle theme"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="min-w-40 border border-border/60 bg-popover text-popover-foreground shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => handleThemeSelect("light")}
          className={theme === "light" ? "font-semibold text-foreground" : ""}
        >
          Light
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeSelect("dark")}
          className={theme === "dark" ? "font-semibold text-foreground" : ""}
        >
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeSelect("system")}
          className={theme === "system" ? "font-semibold text-foreground" : ""}
        >
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
