import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container py-24 text-center">
      <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🔍</div>
      <h1 style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
        letterSpacing: "-0.03em",
        color: "var(--text-primary)",
        marginBottom: "0.5rem"
      }}>
        Page not found
      </h1>
      <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
        The page you&apos;re looking for doesn&apos;t exist in CareerVault.
      </p>
      <Link href="/directory" className="detail-cta-btn">
        Back to Directory
      </Link>
    </section>
  );
}
