import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b bg-background/85 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight">
            CareerVault
          </Link>
          <nav className="flex items-center gap-5 text-sm font-medium">
            <Link href="/directory" className="hover:text-primary">
              Directory
            </Link>
            <Link href="/disclaimer" className="hover:text-primary">
              Disclaimer
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className="mt-20 border-t py-10 text-sm text-muted-foreground">
        <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>Discover Careers at the World's Best Companies</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
