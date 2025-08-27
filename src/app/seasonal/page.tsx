export default function SeasonalPage() {
  const months = [
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

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Alimentos Sazonais
        </h1>
        <p className="text-foreground/80">
          Navegue por um mês para ver exemplos de frutas e verduras que
          geralmente estão na safra. Conteúdo ilustrativo por enquanto.
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {months.map((m) => (
          <div key={m} className="rounded-lg border border-foreground/10 p-4">
            <h2 className="text-xl font-semibold">{m}</h2>
            <p className="text-sm text-foreground/70">
              Exemplos: maçãs, peras, folhas verdes (ilustrativo)
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
