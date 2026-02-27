import Link from "next/link";
import { CompanyCard } from "@/components/company-card";
import { getRecentlyAdded, getTopCompanies } from "@/lib/companies";
import { HeroSearch } from "@/components/hero-search";

export const revalidate = 3600;

export default async function HomePage() {
  const [topIT, topManufacturing, recent] = await Promise.all([
    getTopCompanies("IT", 6),
    getTopCompanies("Manufacturing", 6),
    getRecentlyAdded(6),
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="hero-bg" />
        <div className="container relative z-10 py-20 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <div className="badge-pill mb-6 inline-flex items-center gap-2">
              <span className="dot-pulse" />
              <span>500+ roles updated daily across 50 companies</span>
            </div>
            <h1 className="hero-title">
              Find Your Next
              <br />
              <span className="gradient-text">Dream Role</span>
            </h1>
            <p className="mt-5 text-lg text-slate-400 md:text-xl">
              Search by job title or company — direct links to official career pages, no middlemen.
            </p>
            <div className="mt-10">
              <HeroSearch />
            </div>
          </div>
        </div>
        <div className="hero-grid-overlay" />
      </section>

      {/* Stats bar */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="container">
          <div className="grid grid-cols-2 divide-x divide-white/5 md:grid-cols-4">
            {[
              { value: "50+", label: "Companies" },
              { value: "IT & Mfg", label: "Industries" },
              { value: "100%", label: "Official Links" },
              { value: "Free", label: "Always" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-5 text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="mt-0.5 text-xs text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top IT Companies */}
      <section className="container py-16">
        <div className="section-header">
          <div>
            <div className="section-tag">Technology</div>
            <h2 className="section-title">Top IT Companies</h2>
          </div>
          <Link href="/directory?category=IT" className="view-all-link">
            View all <span>→</span>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topIT.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>
      </section>

      {/* Top Manufacturing */}
      <section className="container py-6 pb-16">
        <div className="section-header">
          <div>
            <div className="section-tag">Industrial</div>
            <h2 className="section-title">Top Manufacturing Companies</h2>
          </div>
          <Link href="/directory?category=Manufacturing" className="view-all-link">
            View all <span>→</span>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topManufacturing.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>
      </section>

      {/* Recently Added */}
      <section className="container pb-16">
        <div className="section-header">
          <div>
            <div className="section-tag">New</div>
            <h2 className="section-title">Recently Added</h2>
          </div>
          <Link href="/directory" className="view-all-link">
            Browse all <span>→</span>
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((company, i) => (
            <CompanyCard key={company.id} company={company} index={i} />
          ))}
        </div>
      </section>

      {/* CTA Newsletter */}
      <section className="container pb-20">
        <div className="cta-card">
          <div className="cta-glow" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <h3 className="text-2xl font-bold text-white md:text-3xl">
              Stay ahead of the market
            </h3>
            <p className="max-w-md text-slate-400">
              Get notified when new companies and roles are added to CareerVault.
            </p>
            <div className="flex w-full max-w-sm flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="you@email.com"
                className="cta-input"
              />
              <button className="cta-btn">Notify Me</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
