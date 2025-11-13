import React from "react";
import { AnimatedSpan, Terminal, TypingAnimation } from "../ui/terminal";

const TerminalAnimation = () => {
  return (
    <Terminal className="justify-self-center w-full sm:max-w-2xl lg:max-w-3xl xl:max-w-4xl min-h-[400px]">
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
  );
};

export default TerminalAnimation;
