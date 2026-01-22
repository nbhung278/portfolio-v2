"use client";

import { useState, useMemo } from "react";
import ProjectCard from "@/components/Projects/ProjectCard";
import { projects } from "@/constants/projects";
import { cn } from "@/lib/utils";
import { DotPattern } from "@/components/ui/dot-pattern";
import { motion, AnimatePresence } from "motion/react";

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
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            My Projects
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            A collection of professional and personal projects showcasing my
            experience in full-stack development, from e-commerce platforms to
            social networks.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filterButtons.map((btn, index) => (
            <motion.button
              key={btn.value}
              onClick={() => setFilter(btn.value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
                filter === btn.value
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-secondary/60 text-secondary-foreground hover:bg-secondary/80"
              )}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {btn.label}
              <span className="ml-2 rounded-full bg-background/20 px-2 py-0.5 text-xs">
                {btn.count}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                className="h-full"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  layout: { duration: 0.3 }
                }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {filteredProjects.length === 0 && (
            <motion.div
              className="flex flex-col items-center justify-center py-20 text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-lg text-muted-foreground">
                No projects found for this filter.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
