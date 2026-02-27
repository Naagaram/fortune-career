export default function Loading() {
  return (
    <section className="container py-10">
      <div style={{
        height: "2.5rem",
        width: "40%",
        background: "var(--bg-elevated)",
        borderRadius: "8px",
        marginBottom: "2rem",
        animation: "pulse 2s ease-in-out infinite"
      }} />
      <div className="grid sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1rem" }}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{
              height: "180px",
              background: "var(--bg-elevated)",
              borderRadius: "16px",
              animation: "pulse 2s ease-in-out infinite",
              animationDelay: `${i * 100}ms`
            }}
          />
        ))}
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
