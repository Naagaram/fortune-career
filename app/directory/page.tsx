import { DirectoryClient } from "@/components/directory-client";
import { getCompanies } from "@/lib/companies";
import { companyQuerySchema } from "@/lib/validators";

export const revalidate = 3600;

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: {
    search?: string | string[];
    category?: string | string[];
    country?: string | string[];
    job?: string | string[];
  };
}) {
  const toSingle = (value?: string | string[]) =>
    Array.isArray(value) ? value[0] : value;

  const companies = await getCompanies();
  const parsed = companyQuerySchema.safeParse({
    search: toSingle(searchParams.search),
    category: toSingle(searchParams.category),
    country: toSingle(searchParams.country),
  });
  const query = parsed.success ? parsed.data : {};
  const initialCategory =
    query.category === "IT" || query.category === "Manufacturing"
      ? query.category
      : "All";

  return (
    <>
      <section className="container py-10">
        <h1 className="page-title">Company Directory</h1>
        <p className="page-subtitle">
          Search by job role to find matching positions at all companies, or browse by company name, industry, or location.
        </p>
      </section>
      <DirectoryClient
        companies={companies}
        initialSearch={query.search}
        initialCategory={initialCategory}
        initialCountry={query.country}
        initialJob={toSingle(searchParams.job)}
      />
    </>
  );
}
