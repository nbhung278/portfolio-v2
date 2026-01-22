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
import { motion } from "motion/react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

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
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Experience & Certifications
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Over 4 years of professional experience in full-stack development,
            building scalable applications and delivering high-quality solutions.
          </p>
        </motion.div>

        {/* AWS Certification Highlight Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Award className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Certifications
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={fadeInUp}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <CertificationCard certification={cert} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Work Experience Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Work Experience
            </h2>
          </div>
          <div className="space-y-0">
            {workExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <ExperienceCard experience={experience} />
                {index === workExperiences.length - 1 && (
                  <motion.div
                    className="relative z-10 flex h-6 w-6 ml-0 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6">
            <Code className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">
              Technical Skills
            </h2>
          </div>
          <motion.div
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-50px" }}
          >
            {/* Languages */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.languages.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Frontend */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Frontend
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.frontend.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Backend */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Backend
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.backend.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Database */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Database
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.database.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Cloud & Deployment */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Cloud & Deployment
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.cloud.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tools & Others */}
            <motion.div
              className="rounded-xl border bg-background p-6 [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)] hover:shadow-xl transition-shadow duration-300"
              variants={fadeInUp}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <h3 className="mb-4 text-lg font-semibold text-foreground">
                Tools & Others
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.tools.map((skill, i) => (
                  <motion.span
                    key={skill}
                    className="rounded-md border border-border/50 bg-secondary/60 px-3 py-1.5 text-sm text-secondary-foreground hover:bg-primary/10 hover:border-primary/30 transition-colors cursor-default"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.2, delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
