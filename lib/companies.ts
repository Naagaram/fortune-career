import { Prisma } from "@prisma/client";
import { cache } from "react";
import { prisma } from "@/lib/prisma";

export type CompanyFilters = {
  category?: "IT" | "Manufacturing";
  search?: string;
  country?: string;
};

export const getCompanies = cache(async (filters: CompanyFilters = {}) => {
  const where: Prisma.CompanyWhereInput = {
    ...(filters.category ? { category: filters.category } : {}),
    ...(filters.search
      ? {
          name: {
            contains: filters.search,
            mode: "insensitive"
          }
        }
      : {}),
    ...(filters.country
      ? {
          headquarters: {
            contains: filters.country,
            mode: "insensitive"
          }
        }
      : {})
  };

  return prisma.company.findMany({
    where,
    orderBy: [{ createdAt: "desc" }, { name: "asc" }]
  });
});

export const getCompanyBySlug = cache(async (slug: string) => {
  return prisma.company.findUnique({ where: { slug } });
});

export async function getTopCompanies(category: "IT" | "Manufacturing", limit = 8) {
  return prisma.company.findMany({
    where: { category },
    orderBy: { name: "asc" },
    take: limit
  });
}

export async function getRecentlyAdded(limit = 8) {
  return prisma.company.findMany({
    orderBy: { createdAt: "desc" },
    take: limit
  });
}
