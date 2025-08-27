"use client";

import { useState } from "react";
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

export default function MonthlyPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const data = getSeasonal(selectedMonth);

  return (
    <section className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">
          Visualização Mensal
        </h1>
        <p className="text-foreground/80">
          Selecione um mês para ver todos os alimentos em safra.
        </p>
      </header>

      <div className="flex items-center gap-4">
        <label htmlFor="month-select" className="text-sm font-medium">
          Mês:
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="rounded-md border border-foreground/20 bg-transparent px-3 py-2 outline-none focus:border-foreground/40"
        >
          {MONTHS_PT.map((monthName, index) => (
            <option key={index + 1} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-lg border border-foreground/10 p-6">
        <h2 className="text-2xl font-bold mb-6">
          {MONTHS_PT[selectedMonth - 1]}
        </h2>

        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-green-600">
                Frutas
              </h3>
              <ul className="space-y-2">
                {data.fruits.map((item) => (
                  <li
                    key={item}
                    className="text-sm p-2 bg-green-50 dark:bg-green-900/20 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-orange-600">
                Legumes
              </h3>
              <ul className="space-y-2">
                {data.legumes.map((item) => (
                  <li
                    key={item}
                    className="text-sm p-2 bg-orange-50 dark:bg-orange-900/20 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-600">
                Verduras e Temperos
              </h3>
              <ul className="space-y-2">
                {data.greensAndHerbs.map((item) => (
                  <li
                    key={item}
                    className="text-sm p-2 bg-emerald-50 dark:bg-emerald-900/20 rounded"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="text-center text-foreground/70 py-8">
            Sem dados disponíveis para este mês.
          </p>
        )}
      </div>
    </section>
  );
}
