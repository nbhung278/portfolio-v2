"use client";
import { FileTextIcon } from "@radix-ui/react-icons";
import { Network, Share2Icon } from "lucide-react";

import { cn } from "@/lib/utils";
import { BentoCard, BentoGrid } from "../ui/bento-grid";
import { Marquee } from "../ui/marquee";
import { IconCloud } from "../ui/icon-cloud";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useCallback, memo } from "react";

const files = [
  {
    name: "Nguyen-Ba-Hung-Resume.pdf",
    body: "Latest resume highlighting my experience, projects, and skills — ready to download.",
  },
  {
    name: "Nguyen-Ba-Hung-Skills.pdf",
    body: "Skill list showcasing my experience with React, Next.js, Node.js, and other technologies.",
  },
  {
    name: "Nguyen-Ba-Hung-Projects.pdf",
    body: "Project list showcasing my experience with React, Next.js, Node.js, and other technologies.",
  },
  {
    name: "Nguyen-Ba-Hung-Certificates.pdf",
    body: "Certification list showcasing AWS, Docker, and other industry-recognized credentials.",
  },
  {
    name: "Nguyen-Ba-Hung-Experience.pdf",
    body: "Experience summary highlighting skills, projects, and certifications — ready to download.",
  },
];

const images = [
  "/svg/reactjs-svgrepo-com.svg",
  "/svg/nextjs-svgrepo-com.svg",
  "/svg/nodejs-icon-svgrepo-com.svg",
  "/svg/css3-svgrepo-com.svg",
  "/svg/html-5-svgrepo-com.svg",
  "/svg/docker-svgrepo-com.svg",
  "/svg/firebase-svgrepo-com.svg",
  "/svg/google-cloud-svgrepo-com.svg",
  "/svg/graphql-svgrepo-com.svg",
  "/svg/jest-svgrepo-com.svg",
  "/svg/material-ui-svgrepo-com.svg",
  "/svg/mongo-svgrepo-com.svg",
  "/svg/nestjs-svgrepo-com.svg",
  "/svg/postgresql-logo-svgrepo-com.svg",
  "/svg/postman-icon-svgrepo-com.svg",
  "/svg/prisma-svgrepo-com.svg",
  "/svg/redux-svgrepo-com.svg",
  "/svg/amazon-1.svg",
];

const downloadFile = (path: string, filename?: string) => {
  const link = document.createElement("a");
  link.href = path;
  if (filename) {
    link.download = filename;
  }
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const RESUME_PATH = "/downloads/Nguyen-Ba-Hung-11112025.pdf";

const FileItem = memo(({ file }: { file: (typeof files)[number] }) => {
  const handleDownload = useCallback(() => {
    downloadFile(RESUME_PATH, file.name);
  }, [file.name]);

  return (
    <figure
      className={cn(
        "relative w-32 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/10 bg-gray-950/1 hover:bg-gray-950/5",
        "dark:border-gray-50/10 dark:bg-gray-50/10 dark:hover:bg-gray-50/15",
        "transform-gpu blur-[1px] transition-all duration-300 ease-out hover:blur-none"
      )}
    >
      <div
        className="flex flex-row items-center gap-2"
        onClick={handleDownload}
      >
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {file.name}
          </figcaption>
        </div>
      </div>
      <blockquote className="mt-2 text-xs">{file.body}</blockquote>
    </figure>
  );
});

FileItem.displayName = "FileItem";

const ResumeBackground = memo(() => {
  const fileItems = useMemo(
    () => files.map((file) => <FileItem key={file.name} file={file} />),
    []
  );

  return (
    <Marquee
      pauseOnHover
      className="absolute top-10 mask-[linear-gradient(to_top,transparent_40%,#000_100%)] [--duration:20s]"
    >
      {fileItems}
    </Marquee>
  );
});

ResumeBackground.displayName = "ResumeBackground";

const TechStackBackground = memo(() => {
  return (
    <div className="w-full h-full flex items-center justify-center cursor-pointer">
      <IconCloud images={images} size={200} />
    </div>
  );
});

TechStackBackground.displayName = "TechStackBackground";

const CertificationsBackground = memo(
  ({ onNavigate }: { onNavigate: () => void }) => {
    return (
      <div
        className="w-full h-full flex items-center justify-center cursor-pointer"
        onClick={onNavigate}
      >
        <Image
          src="/images/aws-dva-1.png"
          alt="AWS DVA"
          width={200}
          height={200}
        />
      </div>
    );
  }
);

CertificationsBackground.displayName = "CertificationsBackground";

export default function ContentGrid() {
  const router = useRouter();

  const handleNavigateToExperience = useCallback(() => {
    router.push("/experience");
  }, [router]);

  const features = useMemo(() => {
    return [
      {
        Icon: FileTextIcon,
        name: "Download My Resume",
        description:
          "A quick summary of my experience, projects, and skills — available for download.",
        href: RESUME_PATH,
        className: "col-span-3 lg:col-span-1",
        background: <ResumeBackground />,
      },
      {
        Icon: Share2Icon,
        name: "Tech Stack",
        description: "The tools I rely on to build performant.",
        href: "#",
        className: "lg:col-span-1",
        background: <TechStackBackground />,
      },
      {
        Icon: Network,
        name: "Certifications",
        description:
          "This is my certifications, you can see more details in my resume.",
        href: "#",
        className: "lg:col-span-1",
        background: (
          <CertificationsBackground onNavigate={handleNavigateToExperience} />
        ),
      },
    ];
  }, [handleNavigateToExperience]);

  return (
    <BentoGrid>
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}
