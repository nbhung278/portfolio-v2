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
        I’m a web developer with{" "}
        <Highlighter action="highlight" color="#87CEFA">
          almost 4 years
        </Highlighter>{" "}
        of experience in
        <Highlighter action="underline" color="#FF9800">
          both frontend and backend
        </Highlighter>
        . I specialize in Node.js, ReactJS, and Laravel, with solid knowledge of
        architecture design, UX/UI, and software patterns. My experience covers
        Next.js, NestJS, Docker, Redis, and Pub/Sub for building scalable
        systems. I also work with Firebase and AWS, implementing CI/CD pipelines
        and serverless architectures for secure, efficient cloud applications.
      </p>
    </div>
  );
};

export default Information;
