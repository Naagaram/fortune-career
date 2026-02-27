import Link from "next/link";
import { type Company } from "@prisma/client";
import { Badge, Button, Card } from "@/components/ui";

export function CompanyCard({ company }: { company: Company }) {
  return (
    <Card className="group animate-fadeInUp p-5 transition-transform hover:-translate-y-1">
      <div className="mb-4 h-10 w-10 rounded-xl bg-primary/10" aria-hidden />
      <h3 className="text-lg font-semibold">{company.name}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{company.industry}</p>
      <p className="mt-3 text-sm text-muted-foreground">{company.headquarters}</p>
      <div className="mt-4 flex items-center justify-between">
        <Badge>{company.category}</Badge>
        <Link href={`/company/${company.slug}`}>
          <Button size="sm">View Careers</Button>
        </Link>
      </div>
    </Card>
  );
}
