import type { Metadata } from "next";
import Link from "next/link"; // used for internal back link
import { notFound } from "next/navigation";
import { getCompanyBySlug, getCompanies } from "@/lib/companies";
import { safeExternalUrl } from "@/lib/security";
import { buildJobSearchUrl } from "@/lib/job-roles";
import { CompanyLogo } from "@/components/company-logo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const companies = await getCompanies();
  return companies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);
  if (!company) return { title: "Company not found" };
  return {
    title: `${company.name} Careers`,
    description: `Explore careers at ${company.name}. Find open roles on the official careers page.`,
    openGraph: {
      title: `${company.name} Careers | CareerVault`,
      description: company.description,
      type: "article",
    },
  };
}

const FEATURED_ROLES = [
  "Software Engineer",
  "DevOps Engineer",
  "Data Scientist",
  "Product Manager",
  "ML Engineer",
  "Cloud Architect",
  "Security Engineer",
  "QA Engineer",
];

export default async function CompanyDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const company = await getCompanyBySlug(params.slug);
  if (!company) notFound();

  // Direct external URLs — no redirect wrapper
  const featuredRoleLinks = FEATURED_ROLES.map((role) => ({
    role,
    url: buildJobSearchUrl(company, role),
  }));

  return (
    <div className="container py-10 max-w-4xl">
      {/* Back */}
      <Link href="/directory" className="back-link">
        ← Back to Directory
      </Link>

      {/* Company Header */}
      <div className="detail-header">
        <div className="detail-logo-wrap">
          <CompanyLogo
            slug={company.slug}
            websiteUrl={company.websiteUrl}
            name={company.name}
            size={64}
          />
        </div>
        <div className="detail-header-info">
          <div className="flex items-center gap-3">
            <h1 className="detail-company-name">{company.name}</h1>
            <span
              className={`category-badge ${
                company.category === "IT" ? "badge-it" : "badge-mfg"
              }`}
            >
              {company.category}
            </span>
          </div>
          <p className="detail-industry">{company.industry}</p>
          <div className="detail-hq">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {company.headquarters}
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="detail-card">
        <h2 className="detail-section-title">About</h2>
        <p className="detail-description">{company.description}</p>
        <div className="detail-links">
          <a
            href={safeExternalUrl(company.websiteUrl)}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-website-link"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            {company.websiteUrl}
          </a>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="detail-cta-wrap">
        <a href={company.careersUrl} target="_blank" rel="noopener noreferrer" className="detail-cta-btn">
          View All Open Roles →
        </a>
      </div>

      {/* Search by Role */}
      <div className="detail-card mt-8">
        <h2 className="detail-section-title">Search by Role at {company.name}</h2>
        <p className="detail-section-sub">
          Jump directly to specific job categories on {company.name}&apos;s official careers page.
        </p>
        <div className="role-grid">
          {featuredRoleLinks.map(({ role, url }) => (
            <a
              key={role}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="role-pill"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              {role}
              <span className="role-arrow">↗</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
