import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CompanyCard } from "@/components/company-card";
import { Badge, Button, Card, Input } from "@/components/ui";
import { getRecentlyAdded, getTopCompanies } from "@/lib/companies";

export const revalidate = 3600;

export default async function HomePage() {
  const [topIT, topManufacturing, recent] = await Promise.all([
    getTopCompanies("IT", 6),
    getTopCompanies("Manufacturing", 6),
    getRecentlyAdded(6)
  ]);

  return (
    <>
      <section className="container py-14">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="mb-4">Career Discovery Directory</Badge>
          <h1 className="text-balance text-4xl font-bold tracking-tight md:text-6xl">Discover Careers at the World's Best Companies</h1>
          <p className="mt-4 text-lg text-muted-foreground">Explore Fortune IT and Manufacturing leaders and jump to official careers pages.</p>

          <Card className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 p-4 sm:flex-row">
            <Input aria-label="Search companies" placeholder="Search companies" className="sm:flex-1" />
            <Link href="/directory" className="w-full sm:w-auto">
              <Button className="w-full gap-2" size="lg">
                Explore Directory <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      <section className="container py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Top IT Companies</h2>
          <Link href="/directory?category=IT" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topIT.map((company) => <CompanyCard key={company.id} company={company} />)}
        </div>
      </section>

      <section className="container py-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Top Manufacturing Companies</h2>
          <Link href="/directory?category=Manufacturing" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {topManufacturing.map((company) => <CompanyCard key={company.id} company={company} />)}
        </div>
      </section>

      <section className="container py-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Recently Added Companies</h2>
          <Link href="/directory" className="text-sm text-primary hover:underline">Browse directory</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recent.map((company) => <CompanyCard key={company.id} company={company} />)}
        </div>
      </section>

      <section className="container py-16">
        <Card className="p-8">
          <h3 className="text-2xl font-semibold">Newsletter</h3>
          <p className="mt-2 text-muted-foreground">Get monthly updates when new companies are added.</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Input placeholder="you@company.com" type="email" className="sm:max-w-sm" />
            <Button>Notify Me</Button>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">Analytics placeholder: integrate your preferred analytics provider here.</p>
        </Card>
      </section>
    </>
  );
}
