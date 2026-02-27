import type { MetadataRoute } from "next";
import { getCompanies } from "@/lib/companies";
import { siteConfig } from "@/lib/constants";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const companies = await getCompanies();
  const staticRoutes = ["", "/directory", "/disclaimer", "/privacy", "/terms"].map((route) => ({
    url: `${siteConfig.url}${route}`,
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7
  }));

  const companyRoutes = companies.map((company) => ({
    url: `${siteConfig.url}/company/${company.slug}`,
    lastModified: company.createdAt,
    changeFrequency: "weekly" as const,
    priority: 0.8
  }));

  return [...staticRoutes, ...companyRoutes];
}
