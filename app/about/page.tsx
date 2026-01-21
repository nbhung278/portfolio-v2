"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { Award, BookOpen, Code2, GraduationCap, Heart, Rocket } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  const education = {
    institution: "Electric Power University",
    period: "August 2018 - March 2023",
    degree: "Bachelor's Degree",
    major: "Information Technology / E-commerce",
    achievements: [
      "Achieved good results in many specialized information technology subjects, such as database and web programming",
      "Foreign language certificate equivalent to a B2 certificate",
    ],
  };

  const interests = [
    {
      icon: Code2,
      title: "Clean Code",
      description:
        "Passionate about writing maintainable, scalable, and well-documented code following best practices.",
    },
    {
      icon: Rocket,
      title: "Performance",
      description:
        "Always looking for ways to optimize application performance and user experience.",
    },
    {
      icon: BookOpen,
      title: "Learning",
      description:
        "Constantly learning new technologies and staying updated with industry trends.",
    },
    {
      icon: Heart,
      title: "Problem Solving",
      description:
        "Enjoy tackling complex problems and finding elegant solutions to technical challenges.",
    },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden py-20 md:py-28">
      {/* Background Pattern */}
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "mask-[radial-gradient(600px_circle_at_center,white,transparent)]"
        )}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            About Me
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A passionate full-stack developer dedicated to building exceptional
            digital experiences
          </p>
        </div>

        {/* Profile Section */}
        <div className="mb-16 rounded-xl border bg-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start">
            {/* Profile Image */}
            <div className="flex shrink-0 justify-center md:justify-start">
              <div className="relative h-48 w-48 overflow-hidden rounded-2xl border-4 border-primary/20">
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                  <span className="text-6xl font-bold text-primary">HN</span>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="flex-1 space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Nguyễn Bá Hưng
              </h2>
              <p className="text-lg font-medium text-primary">
                Full-Stack Developer
              </p>
              <div className="space-y-3 text-muted-foreground leading-relaxed">
                <p>
                  I am a web developer with over 4 years of experience,
                  including more than 1 year in backend development using
                  Laravel and around 3 years specializing in Node.js and
                  ReactJS.
                </p>
                <p>
                  I have a strong grasp of architectural design, UX/UI
                  principles, and software design patterns. My experience spans
                  frontend and backend technologies, including Next.js, NestJS,
                  Docker, Redis, and Pub/Sub, enabling me to build scalable,
                  high-performance, and maintainable systems.
                </p>
                <p>
                  I also work with cloud platforms such as Firebase and AWS,
                  implement CI/CD pipelines, and design serverless architectures
                  to deliver secure and efficient cloud-native applications.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        <div className="mb-16">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Education</h2>
          </div>
          <div className="rounded-xl border bg-background p-8 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-foreground">
                {education.institution}
              </h3>
              <p className="text-sm text-muted-foreground">{education.period}</p>
            </div>
            <div className="mb-4">
              <p className="text-base font-medium text-foreground">
                {education.degree} - {education.major}
              </p>
            </div>
            <div>
              <h4 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground">
                Achievements
              </h4>
              <ul className="space-y-2">
                {education.achievements.map((achievement, index) => (
                  <li
                    key={index}
                    className="flex items-start text-sm text-muted-foreground leading-relaxed"
                  >
                    <span className="mr-2 mt-0.5 text-primary">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Interests & Passions */}
        <div>
          <div className="mb-6 flex items-center gap-3">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Interests & Passions
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {interests.map((interest, index) => {
              const Icon = interest.icon;
              return (
                <div
                  key={index}
                  className="group rounded-xl border bg-background p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">
                    {interest.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {interest.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
