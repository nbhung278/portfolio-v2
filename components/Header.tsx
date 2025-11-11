"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const Header = () => {
	const headerRef = useRef<HTMLDivElement | null>(null);
	const [isSticky, setIsSticky] = useState(false);
	const [headerHeight, setHeaderHeight] = useState(0);
	const TOP_OFFSET = 24;

	useEffect(() => {
		const node = headerRef.current;
		if (!node) {
			return;
		}

		const updateMeasurements = () => {
			setHeaderHeight(node.offsetHeight);
		};

		updateMeasurements();

		const handleScroll = () => {
			const threshold = 2;
			setIsSticky(window.scrollY > threshold);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", updateMeasurements);

		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", updateMeasurements);
		};
	}, []);

	useEffect(() => {
		const node = headerRef.current;
		if (!node) {
			return;
		}
		setHeaderHeight(node.offsetHeight);
	}, [isSticky]);

	const containerClasses =
		"pointer-events-auto flex w-full items-center justify-between gap-4 px-6 py-6 transition-all duration-300 ease-out lg:px-10";

	const containerStyle: React.CSSProperties = {
		width: "80%",
		maxWidth: isSticky ? "80%" : "1120px",
		transform: isSticky ? "scale(1)" : "scale(0.97)",
		transformOrigin: "top center",
		borderRadius: "24px",
		backgroundColor: isSticky ? "rgba(255, 255, 255, 0.3)" : "transparent",
		backdropFilter: isSticky ? "blur(10px)" : "none",
		WebkitBackdropFilter: isSticky ? "blur(10px)" : "none",
		boxShadow: isSticky ? "0 20px 45px rgba(15, 23, 42, 0.16)" : "none",
		border: "none",
	};

	return (
		<>
			<div
				className="pointer-events-none fixed inset-x-0 z-50 flex justify-center"
				style={{ top: TOP_OFFSET }}
			>
				<div
					ref={headerRef}
					className={containerClasses}
					style={containerStyle}
				>
					<div className="text-2xl font-bold">Portfolio</div>
					<div className="flex items-center gap-8">
						<Link href="/">Home</Link>
						<Link href="/about">Projects</Link>
						<Link href="/about">About</Link>
						<Link href="/contact">Contact</Link>
					</div>
					<div className="flex items-center gap-4">
						<Link href="/login">Login</Link>
						<Link href="/register">Register</Link>
					</div>
				</div>
			</div>
			<div style={{ height: headerHeight + TOP_OFFSET }} aria-hidden="true" />
		</>
	);
};
export default Header;
