import { DirectoryClient } from "@/components/directory-client";
import { getCompanies } from "@/lib/companies";
import { companyQuerySchema } from "@/lib/validators";

export const revalidate = 3600;

export default async function DirectoryPage({
  searchParams
}: {
  searchParams: { search?: string; category?: string; country?: string };
}) {
  const companies = await getCompanies();
  const parsed = companyQuerySchema.safeParse({
    search: searchParams.search,
    category: searchParams.category,
    country: searchParams.country
  });
  const query = parsed.success ? parsed.data : {};
  const initialCategory =
    query.category === "IT" || query.category === "Manufacturing" ? query.category : "All";

  return (
    <>
      <section className="container py-10">
        <h1 className="text-4xl font-bold">Company Directory</h1>
        <p className="mt-3 text-muted-foreground">Filter by industry, country, and company size. Fuzzy search is built-in for quick discovery.</p>
      </section>
      <DirectoryClient
        companies={companies}
        initialSearch={query.search}
        initialCategory={initialCategory}
        initialCountry={query.country}
      />
    </>
  );
}
