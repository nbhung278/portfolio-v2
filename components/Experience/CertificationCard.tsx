"use client";

import { memo } from "react";
import { Award, Calendar, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Certification } from "@/constants/experience";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard = memo(({ certification }: CertificationCardProps) => {
  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-xl border transition-all duration-300",
        "bg-background [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "dark:bg-background dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
        certification.featured &&
          "ring-2 ring-primary/20 dark:ring-primary/30 shadow-lg shadow-primary/10",
        "hover:scale-[1.02] hover:shadow-xl"
      )}
    >
      {/* Featured Badge */}
      {certification.featured && (
        <div className="absolute right-4 top-4 z-10">
          <span className="flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary border border-primary/20">
            <Award className="h-3 w-3" />
            Featured
          </span>
        </div>
      )}

      {/* Logo Section */}
      {certification.logo && (
        <div className="flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-background p-8 min-h-[180px]">
          <Image
            src={certification.logo}
            alt={certification.name}
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {certification.name}
          </h3>
          <p className="text-sm font-medium text-muted-foreground">
            {certification.issuer}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5" />
            <span>Issued: {certification.date}</span>
          </div>
          {certification.expiryDate && (
            <div className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" />
              <span>Expires: {certification.expiryDate}</span>
            </div>
          )}
        </div>

        {certification.credentialUrl && (
          <Button
            variant="outline"
            size="sm"
            className="mt-auto h-9 w-full"
            asChild
          >
            <a
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="text-xs font-medium">View Credential</span>
            </a>
          </Button>
        )}
      </div>

      {/* Hover overlay */}
      <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
    </div>
  );
});

CertificationCard.displayName = "CertificationCard";

export default CertificationCard;
