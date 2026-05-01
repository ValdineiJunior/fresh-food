"use client";

import Link from "next/link";
import { useState } from "react";
import { getSeasonal } from "@/data/seasonal";
import { MONTHS_PT } from "@/data/months";

export default function MonthlyPage() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const data = getSeasonal(selectedMonth);

  return (
    <section className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Safra do mês
        </h1>
        <p className="max-w-2xl text-muted leading-relaxed">
          Lista completa de frutas, legumes e verduras da estação. Combine com a{" "}
          <Link
            href="/shopping-list"
            className="font-semibold text-primary underline-offset-2 hover:underline"
          >
            lista de compras
          </Link>{" "}
          para ir ao mercado organizado.
        </p>
      </header>

      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="month-select" className="text-sm font-semibold text-foreground">
          Mês
        </label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="rounded-xl border border-border bg-surface px-4 py-2.5 text-sm font-medium text-foreground shadow-sm outline-none transition focus:border-primary/40 focus:ring-2 focus:ring-primary/20"
        >
          {MONTHS_PT.map((monthName, index) => (
            <option key={index + 1} value={index + 1}>
              {monthName}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-2xl border border-border bg-surface p-6 shadow-sm sm:p-8">
        <h2 className="font-display text-2xl font-semibold text-foreground">
          {MONTHS_PT[selectedMonth - 1]}
        </h2>

        {data ? (
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-accent-leaf">
                Frutas
              </h3>
              <ul className="space-y-2">
                {data.fruits.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-accent-leaf/15 bg-accent-leaf/5 px-3 py-2 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-accent-clay">
                Legumes
              </h3>
              <ul className="space-y-2">
                {data.legumes.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-accent-clay/20 bg-accent-clay/5 px-3 py-2 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-display text-lg font-semibold text-primary">
                Verduras e temperos
              </h3>
              <ul className="space-y-2">
                {data.greensAndHerbs.map((item) => (
                  <li
                    key={item}
                    className="rounded-lg border border-primary/15 bg-primary-muted px-3 py-2 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="py-10 text-center text-muted">
            Sem dados disponíveis para este mês.
          </p>
        )}
      </div>
    </section>
  );
}
