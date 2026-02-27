"use client";

import { FormEvent, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { type Company } from "@prisma/client";
import { CompanyCard } from "@/components/company-card";
import { matchJobRoles } from "@/lib/job-roles";

type SearchMode = "company" | "job";
const CATEGORIES = ["All", "IT", "Manufacturing"] as const;

interface DirectoryClientProps {
  companies: Company[];
  initialSearch?: string;
  initialCategory?: "All" | "IT" | "Manufacturing";
  initialCountry?: string;
  initialJob?: string;
}

export function DirectoryClient({
  companies,
  initialSearch = "",
  initialCategory = "All",
  initialCountry = "",
  initialJob = "",
}: DirectoryClientProps) {
  const [mode, setMode] = useState<SearchMode>(initialJob ? "job" : "company");

  const [companySearch, setCompanySearch] = useState(initialSearch);
  const [jobInput, setJobInput] = useState(initialJob);
  const [jobQuery, setJobQuery] = useState(initialJob);

  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>(initialCategory);
  const [country, setCountry] = useState(initialCountry);

  const jobSuggestions = useMemo(() => {
    if (mode !== "job") return [];
    return matchJobRoles(jobInput);
  }, [mode, jobInput]);

  const filtered = useMemo(() => {
    const base = companies.filter((company) => {
      if (category !== "All" && company.category !== category) return false;
      if (country && !company.headquarters.toLowerCase().includes(country.toLowerCase())) return false;
      return true;
    });

    if (mode !== "company") return base;
    const q = companySearch.trim();
    if (!q) return base;

    const fuse = new Fuse(base, {
      keys: ["name", "industry"],
      threshold: 0.35,
    });

    return fuse.search(q).map((result) => result.item);
  }, [companies, category, country, mode, companySearch]);

  const hasFilters =
    companySearch.trim() || jobQuery.trim() || country.trim() || category !== "All";

  const submitCompanySearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCompanySearch((value) => value.trimStart());
  };

  const submitJobSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setJobQuery(jobInput.trim());
  };

  const clearAll = () => {
    setCompanySearch("");
    setJobInput("");
    setJobQuery("");
    setCategory("All");
    setCountry("");
  };

  return (
    <section className="container py-8">
      <div className="dir-mode-toggle">
        <button
          type="button"
          onClick={() => {
            setMode("company");
            setJobInput("");
            setJobQuery("");
          }}
          className={`dir-mode-btn ${mode === "company" ? "active" : ""}`}
        >
          By Company
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("job");
            setCompanySearch("");
          }}
          className={`dir-mode-btn ${mode === "job" ? "active" : ""}`}
        >
          By Job Role
        </button>
      </div>

      <div className="filter-bar">
        {mode === "company" ? (
          <form className="filter-job-wrap" onSubmit={submitCompanySearch}>
            <div className="filter-search-wrap" style={{ flex: 1, minWidth: 0 }}>
              <svg className="filter-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="Search companies..."
                value={companySearch}
                onChange={(e) => setCompanySearch(e.target.value)}
                className="filter-input"
                autoComplete="off"
              />
              {companySearch ? (
                <button type="button" className="filter-clear" onClick={() => setCompanySearch("")}>
                  X
                </button>
              ) : null}
            </div>
            <button type="submit" className="filter-search-btn">
              Search
            </button>
          </form>
        ) : (
          <form className="filter-job-wrap" onSubmit={submitJobSearch}>
            <div className="filter-search-wrap" style={{ flex: 1, minWidth: 0 }}>
              <svg className="filter-search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                type="text"
                placeholder="e.g. Data Scientist"
                value={jobInput}
                onChange={(e) => setJobInput(e.target.value)}
                className="filter-input"
                autoComplete="off"
              />
              {jobInput ? (
                <button
                  type="button"
                  className="filter-clear"
                  onClick={() => {
                    setJobInput("");
                    setJobQuery("");
                  }}
                >
                  X
                </button>
              ) : null}
            </div>
            <button type="submit" className="filter-search-btn">
              Search
            </button>

            {jobSuggestions.length > 0 ? (
              <div className="dir-suggestions">
                {jobSuggestions.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className="dir-suggestion-item"
                    onClick={() => {
                      setJobInput(item);
                      setJobQuery(item);
                    }}
                  >
                    {item}
                  </button>
                ))}
              </div>
            ) : null}
          </form>
        )}

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as (typeof CATEGORIES)[number])}
          className="filter-select"
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item === "All" ? "All Industries" : item}
            </option>
          ))}
        </select>

        <div className="filter-search-wrap">
          <svg className="filter-search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            placeholder="Country..."
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {mode === "job" && jobQuery ? (
        <div className="job-search-banner">
          <div className="job-banner-icon">Target</div>
          <div>
            <div className="job-banner-title">
              Click <strong>Find Jobs</strong> on any card to search <strong>{jobQuery}</strong> on that company site.
            </div>
            <div className="job-banner-sub">{filtered.length} companies available.</div>
          </div>
        </div>
      ) : null}

      <div className="results-header">
        <span className="results-count">
          {filtered.length} {filtered.length === 1 ? "company" : "companies"}
        </span>
        {hasFilters ? (
          <button type="button" className="clear-all-btn" onClick={clearAll}>
            Clear all
          </button>
        ) : null}
      </div>

      {filtered.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((company, index) => (
            <CompanyCard
              key={company.id}
              company={company}
              index={index}
              jobQuery={mode === "job" && jobQuery ? jobQuery : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">No Results</div>
          <h3>No companies found</h3>
          <p>Try a different search term or clear filters.</p>
        </div>
      )}
    </section>
  );
}
