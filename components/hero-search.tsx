"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { matchJobRoles } from "@/lib/job-roles";

type SearchMode = "company" | "job";

export function HeroSearch() {
  const router = useRouter();
  const [mode, setMode] = useState<SearchMode>("company");
  const [query, setQuery] = useState("");

  const suggestions = useMemo(() => {
    if (mode !== "job") return [];
    return matchJobRoles(query);
  }, [mode, query]);

  const submit = (value: string, selectedMode: SearchMode) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (selectedMode === "job") {
      router.push(`/directory?job=${encodeURIComponent(trimmed)}`);
      return;
    }

    router.push(`/directory?search=${encodeURIComponent(trimmed)}`);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit(query, mode);
  };

  return (
    <div className="hero-search-wrapper">
      <div className="search-mode-toggle">
        <button
          type="button"
          onClick={() => {
            setMode("company");
            setQuery("");
          }}
          className={`mode-btn ${mode === "company" ? "active" : ""}`}
        >
          Search by Company
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("job");
            setQuery("");
          }}
          className={`mode-btn ${mode === "job" ? "active" : ""}`}
        >
          Search by Job Role
        </button>
      </div>

      <form className="search-box-outer" onSubmit={onSubmit}>
        <div className="search-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === "job" ? "e.g. Data Scientist" : "e.g. Apple"}
          className="search-input"
          autoComplete="off"
        />

        <button type="submit" className="search-submit-btn">
          Search
        </button>

        {mode === "job" && suggestions.length > 0 ? (
          <div className="suggestions-dropdown">
            {suggestions.map((item) => (
              <button
                type="button"
                key={item}
                className="suggestion-item"
                onClick={() => {
                  setQuery(item);
                  submit(item, "job");
                }}
              >
                {item}
              </button>
            ))}
          </div>
        ) : null}
      </form>

      <div className="quick-picks">
        {(mode === "job"
          ? ["DevOps Engineer", "Data Scientist", "Cloud Architect"]
          : ["Apple", "Microsoft", "Tesla"]
        ).map((item) => (
          <button
            key={item}
            type="button"
            className="quick-pill"
            onClick={() => {
              setQuery(item);
              submit(item, mode);
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}
