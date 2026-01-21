"use client";

import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import ExperienceCard from "@/components/Experience/ExperienceCard";
import CertificationCard from "@/components/Experience/CertificationCard";
import {
  workExperiences,
  certifications,
  skills,
} from "@/constants/experience";
import { Award, Briefcase, Code } from "lucide-react";

export default function ExperiencePage() {
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Experience & Certifications
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Over 4 years of professional experience in full-stack development,
            building scalable applications and delivering high-quality solutions.
          </p>
        </div>

        {/* AWS Certification Highlight Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Certifications
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certifications.map((cert) => (
              <CertificationCard key={cert.id} certification={cert} />
            ))}
          </div>
        </div>

        {/* Work Experience Section */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Work Experience
            </h2>
          </div>
          <div className="space-y-0">
            {workExperiences.map((experience, index) => (
              <div key={experience.id}>
                <ExperienceCard experience={experience} />
                {index === workExperiences.length - 1 && (
                  <div className="relative z-10 flex h-6 w-6 ml-0 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Technical Skills
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Languages */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Frontend */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Database */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Database
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.database.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Cloud & Deployment */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Cloud & Deployment
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.cloud.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Others */}
            <div className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]">
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Tools & Others
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
