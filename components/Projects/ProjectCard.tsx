"use client";

import { memo } from "react";
import { ExternalLink, Github, Calendar, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { Project } from "@/constants/projects";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = memo(({ project }: ProjectCardProps) => {
  const statusColors = {
    completed: "bg-green-500/10 text-green-600 dark:text-green-400",
    "in-progress": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
    personal: "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  };

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300",
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        "hover:scale-[1.02] hover:shadow-xl"
      )}
    >
      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            statusColors[project.status]
          )}
        >
          {project.status === "in-progress"
            ? "In Progress"
            : project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col h-full p-6">
        {/* Header */}
        <div className="mb-4 pr-24">
          <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">
              {project.company}
            </span>
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{project.period}</span>
            </div>
            <span className="text-muted-foreground/50">•</span>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{project.teamSize} members</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-foreground mb-2.5 uppercase tracking-wide">
            Technologies
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs rounded-md bg-secondary/60 text-secondary-foreground border border-border/50"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="px-2.5 py-1 text-xs rounded-md bg-secondary/60 text-secondary-foreground border border-border/50">
                +{project.technologies.length - 5}
              </span>
            )}
          </div>
        </div>

        {/* Responsibilities */}
        <div className="mb-6 flex-grow">
          <h4 className="text-xs font-semibold text-foreground mb-2.5 uppercase tracking-wide">
            Key Responsibilities
          </h4>
          <ul className="space-y-2">
            {project.responsibilities.map((responsibility, index) => (
              <li
                key={index}
                className="text-sm text-muted-foreground flex items-start leading-relaxed"
              >
                <span className="mr-2 text-primary mt-0.5">•</span>
                <span className="line-clamp-3">{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Links */}
        <div className="flex gap-2 mt-auto pt-4 border-t border-border/50">
          {project.website && project.website !== "In progress" && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              asChild
            >
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Visit Site</span>
              </a>
            </Button>
          )}
          {project.repo && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 h-9"
              asChild
            >
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <Github className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">View Code</span>
              </a>
            </Button>
          )}
        </div>
      </div>

      {/* Hover effect overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
});

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
