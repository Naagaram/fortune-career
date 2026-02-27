"use client";

import { useMemo, useState } from "react";
import Fuse from "fuse.js";
import { type Company } from "@prisma/client";
import { CompanyCard } from "@/components/company-card";
import { Input } from "@/components/ui";

const sizeOptions = ["All", "Enterprise", "Large", "Mid-size"] as const;

function inferSize(name: string): (typeof sizeOptions)[number] {
  if (name.length > 14) return "Enterprise";
  if (name.length > 8) return "Large";
  return "Mid-size";
}

type DirectoryClientProps = {
  companies: Company[];
  initialSearch?: string;
  initialCategory?: "All" | "IT" | "Manufacturing";
  initialCountry?: string;
};

export function DirectoryClient({
  companies,
  initialSearch = "",
  initialCategory = "All",
  initialCountry = ""
}: DirectoryClientProps) {
  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState<"All" | "IT" | "Manufacturing">(initialCategory);
  const [country, setCountry] = useState(initialCountry);
  const [companySize, setCompanySize] = useState<(typeof sizeOptions)[number]>("All");

  const filtered = useMemo(() => {
    const base = companies.filter((company) => {
      const categoryMatches = category === "All" || company.category === category;
      const countryMatches = country.length === 0 || company.headquarters.toLowerCase().includes(country.toLowerCase());
      const sizeMatches = companySize === "All" || inferSize(company.name) === companySize;
      return categoryMatches && countryMatches && sizeMatches;
    });

    if (!search.trim()) return base;

    const fuse = new Fuse(base, {
      keys: ["name", "industry"],
      threshold: 0.35,
      includeScore: true
    });

    return fuse.search(search).map((result) => result.item);
  }, [companies, search, category, country, companySize]);

  return (
    <section className="container py-10">
      <div className="grid gap-3 rounded-2xl border bg-card p-4 shadow-soft md:grid-cols-4">
        <Input placeholder="Search by company name" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as "All" | "IT" | "Manufacturing")}
          className="h-10 rounded-xl border bg-background px-3 text-sm"
        >
          <option value="All">All industries</option>
          <option value="IT">IT</option>
          <option value="Manufacturing">Manufacturing</option>
        </select>
        <Input placeholder="Filter by country" value={country} onChange={(e) => setCountry(e.target.value)} />
        <select
          value={companySize}
          onChange={(e) => setCompanySize(e.target.value as (typeof sizeOptions)[number])}
          className="h-10 rounded-xl border bg-background px-3 text-sm"
        >
          {sizeOptions.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
      {filtered.length === 0 ? <p className="mt-8 text-sm text-muted-foreground">No companies matched your filters.</p> : null}
    </section>
  );
}
