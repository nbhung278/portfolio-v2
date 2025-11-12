import { AuroraText } from "./ui/aurora-text";
import { AnimatedSpan, Terminal, TypingAnimation } from "./ui/terminal";
import { Highlighter } from "./ui/highlighter";

const Introduction = () => {
	return (
		<div className="mx-auto grid w-full flex-1 grid-cols-1 place-items-center gap-12 text-center xl:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] xl:items-start xl:justify-items-start xl:text-left">
			<div className="w-full space-y-6 lg:text-left">
				<p className="sm:text-2xl md:text-5xl font-bold text-foreground">
					Hello,
				</p>
				<p className="sm:text-2xl md:text-5xl font-bold text-foreground">
					I&apos;m <AuroraText>Hung Nguyen</AuroraText>
				</p>
				<p className="text-base text-muted-foreground md:text-md text-justify">
					I’m a web developer with{" "}
					<Highlighter action="highlight" color="#87CEFA">
						almost 4 years
					</Highlighter>{" "}
					of experience in
					<Highlighter action="underline" color="#FF9800">
						both frontend and backend
					</Highlighter>
					. I specialize in Node.js, ReactJS, and Laravel, with solid knowledge
					of architecture design, UX/UI, and software patterns. My experience
					covers Next.js, NestJS, Docker, Redis, and Pub/Sub for building
					scalable systems. I also work with Firebase and AWS, implementing
					CI/CD pipelines and serverless architectures for secure, efficient
					cloud applications.
				</p>
			</div>
			<Terminal className="justify-self-center w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
				<TypingAnimation className="text-left">
					npm create my-portfolio@latest
				</TypingAnimation>
				<AnimatedSpan className="text-green-500 text-left">
					✔ name installed successfully.
				</AnimatedSpan>
				<AnimatedSpan className="text-green-500 text-left">
					✔ project initialized successfully.
				</AnimatedSpan>
				<AnimatedSpan className="text-green-500 text-left">
					✔ certificate verified successfully.
				</AnimatedSpan>
				<TypingAnimation className="text-left">
					Success! Project initialization completed.
				</TypingAnimation>
				<TypingAnimation className="text-left">
					Loading developer profile...
				</TypingAnimation>
				<AnimatedSpan className="text-blue-400 text-left">
					Name: Hung Nguyen
				</AnimatedSpan>
				<AnimatedSpan className="text-blue-400 text-left">
					Role: Full-stack Web Developer
				</AnimatedSpan>
				<AnimatedSpan className="text-blue-400 text-left">
					Experience: 4 years
				</AnimatedSpan>
				<AnimatedSpan className="text-blue-400 text-left">
					Certificate: AWS Certified Developer – Associate
				</AnimatedSpan>
				<AnimatedSpan className="text-blue-400 text-left">
					Skills: React, Next.js, Node.js, Typescript, AWS, Docker
				</AnimatedSpan>
				<AnimatedSpan className="text-blue-400 text-left">
					Location: Hanoi, Vietnam
				</AnimatedSpan>
				<TypingAnimation className="text-left">
					System online. Welcome to my portfolio 🚀
				</TypingAnimation>
			</Terminal>
		</div>
	);
};

export default Introduction;
