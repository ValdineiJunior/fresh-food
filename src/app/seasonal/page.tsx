export default function SeasonalPage() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Seasonal Produce</h1>
        <p className="text-foreground/80">
          Browse a month to see example fruits and vegetables that are typically
          in season. Content is placeholder for now.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((m) => (
          <div key={m} className="rounded-lg border border-foreground/10 p-4">
            <h2 className="text-xl font-semibold">{m}</h2>
            <p className="text-sm text-foreground/70">
              Example fresh picks: apples, pears, leafy greens (placeholder)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
