import Link from "next/link";
import { getSeasonal } from "@/data/seasonal";
import { MONTHS_PT } from "@/data/months";

export default function SeasonalPage() {
  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Alimentos sazonais no Brasil
        </h1>
        <p className="max-w-2xl text-muted leading-relaxed">
          Panorama por mês: amostras de frutas, legumes e verduras em safra.
          Para a lista completa do mês, use a página{" "}
          <Link href="/monthly" className="font-semibold text-primary underline-offset-2 hover:underline">
            Mensal
          </Link>
          .
        </p>
      </header>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {MONTHS_PT.map((monthName, index) => {
          const monthNumber = index + 1;
          const data = getSeasonal(monthNumber);

          return (
            <article
              key={monthNumber}
              className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
            >
              <h2 className="font-display text-xl font-semibold text-foreground">
                {monthName}
              </h2>
              {data ? (
                <div className="mt-4 space-y-4 text-sm">
                  <div>
                    <h3 className="font-semibold text-accent-leaf">Frutas</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                      {data.fruits.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent-clay">Legumes</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                      {data.legumes.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">Verduras e temperos</h3>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">
                      {data.greensAndHerbs.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted">Sem dados.</p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
