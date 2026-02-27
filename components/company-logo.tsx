"use client";

import { useState } from "react";
import { getLogoUrls } from "@/lib/job-roles";

interface CompanyLogoProps {
  slug: string;
  websiteUrl: string;
  name: string;
  size?: number;
}

export function CompanyLogo({ slug, websiteUrl, name, size = 40 }: CompanyLogoProps) {
  const logoUrls = getLogoUrls(slug, websiteUrl);
  const [urlIndex, setUrlIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleError = () => {
    if (urlIndex + 1 < logoUrls.length) {
      setUrlIndex((i) => i + 1);
    } else {
      setAllFailed(true);
    }
  };

  if (allFailed || logoUrls.length === 0) {
    return <span className="logo-fallback">{initials}</span>;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logoUrls[urlIndex]}
      alt={`${name} logo`}
      width={size}
      height={size}
      className="logo-img"
      onError={handleError}
    />
  );
}
