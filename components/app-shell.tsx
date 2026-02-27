import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="site-header">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="site-logo">
            <span className="logo-mark">CV</span>
            <span className="logo-text">CareerVault</span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link href="/directory" className="nav-link">
              Directory
            </Link>
            <Link href="/disclaimer" className="nav-link">
              Disclaimer
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="site-footer">
        <div className="container flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <span className="logo-mark-sm">CV</span>
            <p className="text-slate-500 text-sm">Discover careers at the world&apos;s best companies</p>
          </div>
          <div className="flex gap-5 text-sm">
            <Link href="/privacy" className="footer-link">Privacy</Link>
            <Link href="/terms" className="footer-link">Terms</Link>
            <Link href="/disclaimer" className="footer-link">Disclaimer</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
