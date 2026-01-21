"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projects } from "@/constants/projects";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";

export default function ProjectsPage() {
  const [filter, setFilter] = useState<"all" | "featured" | "completed" | "in-progress">("all");

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects;
    if (filter === "featured") return projects.filter((p) => p.featured);
    return projects.filter((p) => p.status === filter);
  }, [filter]);

  const filterButtons = [
    { label: "All Projects", value: "all" as const, count: projects.length },
    // {
    //   label: "Featured",
    //   value: "featured" as const,
    //   count: projects.filter((p) => p.featured).length
    // },
    {
      label: "In Progress",
      value: "in-progress" as const,
      count: projects.filter((p) => p.status === "in-progress").length
    },
    {
      label: "Completed",
      value: "completed" as const,
      count: projects.filter((p) => p.status === "completed").length
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
      <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            My Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of professional and personal projects showcasing my
            experience in full-stack development, from e-commerce platforms to
            social networks.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-8 flex flex-wrap justify-center gap-3">
          {filterButtons.map((btn) => (
            <button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                filter === btn.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {btn.label}
              <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                {btn.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-lg text-muted-foreground">
              No projects found for this filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
