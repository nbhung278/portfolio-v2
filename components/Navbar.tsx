"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Highlighter } from "./ui/highlighter";
import { usePathname } from "next/navigation";
import { TOP_OFFSET } from "@/constants/utils";
import ModeToggle from "./ModeToggle";

const Header = () => {
  const headerRef = useRef<HTMLDivElement | null>(null);
  const [isSticky, setIsSticky] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const node = headerRef.current;
    if (!node) {
      return;
    }

    const handleScroll = () => {
      const threshold = 2;
      setIsSticky(window.scrollY > threshold);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) {
      return;
    }
  }, [isSticky]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

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
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-md ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-muted-foreground"
                } font-medium transition hover:text-foreground`}
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
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
