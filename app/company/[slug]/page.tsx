import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge, Button, Card } from "@/components/ui";
import { getCompanyBySlug, getCompanies } from "@/lib/companies";
import { safeExternalUrl } from "@/lib/security";

export const revalidate = 3600;

export async function generateStaticParams() {
  const companies = await getCompanies();
  return companies.map((company) => ({ slug: company.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const company = await getCompanyBySlug(params.slug);

  if (!company) {
    return {
      title: "Company not found"
    };
  }

  return {
    title: `${company.name} Careers`,
    description: `Explore careers at ${company.name} and visit the official careers page.`,
    openGraph: {
      title: `${company.name} Careers | CareerVault`,
      description: company.description,
      type: "article"
    }
  };
}

export default async function CompanyDetailPage({ params }: { params: { slug: string } }) {
  const company = await getCompanyBySlug(params.slug);

  if (!company) notFound();

  const careersRedirect = `/api/redirect?to=${encodeURIComponent(company.careersUrl)}`;

  return (
    <section className="container py-10">
      <Card className="p-8">
        <Badge>{company.category}</Badge>
        <h1 className="mt-3 text-4xl font-bold">{company.name}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{company.description}</p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div>
            <p className="text-sm font-semibold">Industry</p>
            <p className="text-muted-foreground">{company.industry}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Headquarters</p>
            <p className="text-muted-foreground">{company.headquarters}</p>
          </div>
          <div>
            <p className="text-sm font-semibold">Website</p>
            <Link className="text-primary hover:underline" href={safeExternalUrl(company.websiteUrl)} target="_blank" rel="noopener noreferrer">
              {company.websiteUrl}
            </Link>
          </div>
        </div>

        <Link href={careersRedirect} target="_blank" rel="noopener noreferrer" className="mt-8 inline-block">
          <Button size="lg">See Open Jobs on Official Website</Button>
        </Link>
      </Card>
    </section>
  );
}
