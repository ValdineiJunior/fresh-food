import { getSeasonal } from "@/data/seasonal";

const MONTHS_PT = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export default function SeasonalPage() {
  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Alimentos Sazonais
        </h1>
        <p className="text-foreground/80">
          Veja os alimentos em safra por mês. Mostrando os 3 primeiros itens de
          cada categoria.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MONTHS_PT.map((monthName, index) => {
          const monthNumber = index + 1;
          const data = getSeasonal(monthNumber);

          return (
            <div
              key={monthNumber}
              className="rounded-lg border border-foreground/10 p-4"
            >
              <h2 className="text-xl font-semibold">{monthName}</h2>
              {data ? (
                <div className="mt-3 space-y-4">
                  <div>
                    <h3 className="font-semibold">Frutas</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {data.fruits.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Legumes</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {data.legumes.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold">Verduras e Temperos</h3>
                    <ul className="list-disc pl-5 text-sm">
                      {data.greensAndHerbs.slice(0, 3).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-foreground/70 mt-3">Sem dados.</p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
