import React from "react";
import { AuroraText } from "../ui/aurora-text";
import { Highlighter } from "../ui/highlighter";

const Information = () => {
	return (
		<div className="w-full space-y-6 lg:text-left">
			<p className="sm:text-2xl md:text-5xl font-bold text-foreground">
				Hello,
			</p>
			<p className="sm:text-2xl md:text-5xl font-bold text-foreground">
				I&apos;m <AuroraText>Hung Nguyen</AuroraText>
			</p>
			<p className="text-base text-muted-foreground md:text-md text-justify">
				I’m a Full-Stack Developer with{" "}
				<Highlighter action="highlight" color="#87CEFA">
					4+ years of experience
				</Highlighter>{" "}
				designing and delivering scalable web applications across
				<Highlighter action="underline" color="#FF9800">
					product, freelance, and enterprise
				</Highlighter>{" "}
				environments. Proficient in React, Next.js, NestJS, GraphQL, and
				PostgreSQL, with hands-on experience in cloud infrastructure (AWS,
				Google Cloud), real-time systems (SocketIO, Redis), and AI integration
				(OpenAI, Weaviate). Certified AWS Developer and Claude Code
				practitioner — comfortable working across the full stack, from
				architecting backend services to crafting polished, performant UIs.
			</p>
		</div>
	);
};

export default Information;
