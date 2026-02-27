import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <h1 className="text-4xl font-bold">Company not found</h1>
      <p className="mt-3 text-muted-foreground">The page you requested does not exist in CareerVault.</p>
      <Link href="/directory" className="mt-6 inline-block">
        <Button>Back to Directory</Button>
      </Link>
    </section>
  );
}
