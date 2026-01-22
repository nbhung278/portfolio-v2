"use client";

import Link from "next/link";
import { useEffect, useRef, useState, memo } from "react";
import { Button } from "@/components/ui/button";
import { Github, Heart, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlighter } from "./ui/highlighter";
import { usePathname } from "next/navigation";
import { TOP_OFFSET } from "@/constants/utils";
import ModeToggle from "./ModeToggle";
import { AnimatePresence, motion } from "motion/react";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/experience", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const SCROLL_THRESHOLD = 2;

const Header = memo(() => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const containerClasses = cn(
    "pointer-events-auto flex w-full items-center justify-between gap-4 rounded-3xl border border-border/60 px-4 py-4 transition-all duration-300 ease-out sm:px-6 sm:py-6 lg:px-10",
    "max-w-[98%] md:max-w-[80%] bg-background/90 dark:bg-background/60",
    isSticky
      ? "scale-100 shadow-[0_20px_45px_rgba(15,23,42,0.16)] dark:shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-[15px]"
      : "scale-[0.97]"
  );

  return (
    <>
      <nav
        className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
        style={{ top: TOP_OFFSET }}
      >
        <div ref={headerRef} className={containerClasses}>
          <div className="text-lg font-semibold sm:text-2xl text-foreground">
            <Highlighter action="underline" color="#FF9800">
              <Link key={"logo"} href={"/"}>
                Portfolio
              </Link>
            </Highlighter>
          </div>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-md font-medium transition hover:text-foreground",
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="outline"
              className="cursor-pointer rounded-lg text-center bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
            >
              <Heart className="h-4 w-4 text-destructive" />
              <span className="sr-only sm:not-sr-only sm:ml-2">Sponsor</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="cursor-pointer rounded-lg bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
            >
              <Link
                href="https://github.com/nbhung278"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github />
                <span className="sr-only">GitHub</span>
              </Link>
            </Button>
            <ModeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden cursor-pointer rounded-lg bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 z-50 h-full w-[75%] max-w-sm bg-background border-l border-border shadow-2xl lg:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-xl font-semibold text-foreground">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={closeMobileMenu}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto p-6">
                  <ul className="space-y-1">
                    {NAV_ITEMS.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={closeMobileMenu}
                          className={cn(
                            "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                            pathname === item.href
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-accent hover:text-foreground"
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-border">
                  <p className="text-sm text-muted-foreground text-center">
                    © 2026 Portfolio
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
});

Header.displayName = "Header";

export default Header;
