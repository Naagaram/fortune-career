"use client";

import Link from "next/link";
import { useState } from "react";
import { type Company } from "@prisma/client";
import { getLogoUrls, buildJobSearchUrl } from "@/lib/job-roles";

interface CompanyCardProps {
  company: Company;
  index?: number;
  jobQuery?: string;
}

export function CompanyCard({ company, index = 0, jobQuery }: CompanyCardProps) {
  const logoUrls = getLogoUrls(company.slug, company.websiteUrl);
  const [urlIndex, setUrlIndex] = useState(0);
  const [allFailed, setAllFailed] = useState(false);

  const initials = company.name
    .split(" ")
    .map(w => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleLogoError = () => {
    if (urlIndex + 1 < logoUrls.length) {
      setUrlIndex(i => i + 1);
    } else {
      setAllFailed(true);
    }
  };

  // Direct external URL — no redirect wrapper needed
  const jobUrl = jobQuery ? buildJobSearchUrl(company, jobQuery) : null;

  return (
    <div className="company-card" style={{ animationDelay: `${index * 50}ms` }}>

      {/* Logo + badge */}
      <div className="card-header">
        <div className="logo-wrap">
          {!allFailed && logoUrls.length > 0 ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={logoUrls[urlIndex]}
              alt={`${company.name} logo`}
              width={36}
              height={36}
              className="logo-img"
              onError={handleLogoError}
            />
          ) : (
            <span className="logo-fallback">{initials}</span>
          )}
        </div>
        <span className={`category-badge ${company.category === "IT" ? "badge-it" : "badge-mfg"}`}>
          {company.category === "IT" ? "IT" : "Mfg"}
        </span>
      </div>

      {/* Info */}
      <div className="card-body">
        <h3 className="card-name">{company.name}</h3>
        <p className="card-industry">{company.industry}</p>
        <div className="card-hq">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {company.headquarters}
        </div>
      </div>

      {/* Buttons */}
      <div className="card-footer">
        <Link href={`/company/${company.slug}`} className="card-btn-secondary">
          Profile
        </Link>

        {jobUrl ? (
          <a
            href={jobUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn-primary"
          >
            Find Jobs →
          </a>
        ) : (
          <a
            href={company.careersUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="card-btn-primary"
          >
            Careers →
          </a>
        )}
      </div>
    </div>
  );
}
