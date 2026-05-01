import Link from "next/link";
import type { Metadata } from "next";
import { siteDescription, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${siteName} — Frutas, legumes e verduras da estação e lista de compras`,
  },
  description: siteDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteName} — Alimentos frescos e lista de compras`,
    description: siteDescription,
    url: "/",
  },
};

const cards = [
  {
    href: "/seasonal",
    title: "Calendário sazonal",
    body: "Veja frutas, legumes e verduras em destaque mês a mês no Brasil.",
    accent: "from-primary/15 to-accent-leaf/10",
  },
  {
    href: "/monthly",
    title: "Por mês",
    body: "Escolha um mês e confira a lista completa da safra para planejar refeições.",
    accent: "from-accent-leaf/15 to-primary/10",
  },
  {
    href: "/shopping-list",
    title: "Lista de compras",
    body: "Monte sua lista com itens frescos, copie ou imprima para levar ao mercado.",
    accent: "from-accent-sun/15 to-primary-muted",
  },
] as const;

export default function Home() {
  return (
    <div className="space-y-14">
      <header className="relative overflow-hidden rounded-2xl border border-border bg-surface px-6 py-12 shadow-sm sm:px-10 sm:py-14">
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-accent-leaf/15 blur-3xl"
          aria-hidden
        />
        <p className="relative text-sm font-semibold uppercase tracking-wider text-primary">
          Alimentação natural
        </p>
        <h1 className="relative mt-3 font-display text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl">
          Frutas, legumes e verduras frescas no seu ritmo
        </h1>
        <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {siteName} é um guia leve para quem quer comer melhor: descubra o que
          está na estação, monte uma lista de compra com alimentos frescos e
          leve hábitos mais saudáveis para o dia a dia — sem complicação.
        </p>
        <div className="relative mt-8 flex flex-wrap gap-3">
          <Link
            href="/monthly"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
          >
            Ver safra do mês
          </Link>
          <Link
            href="/shopping-list"
            className="inline-flex items-center justify-center rounded-full border border-border bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50"
          >
            Montar lista de compras
          </Link>
        </div>
      </header>

      <section aria-labelledby="features-heading" className="space-y-6">
        <div>
          <h2
            id="features-heading"
            className="font-display text-2xl font-semibold text-foreground"
          >
            O que você encontra aqui
          </h2>
          <p className="mt-2 max-w-2xl text-muted">
            Tudo pensado para consulta rápida: sazonalidade no Brasil, visualização
            por mês e lista de compras que fica salva no seu navegador.
          </p>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <li key={card.href}>
              <Link
                href={card.href}
                className={`flex h-full flex-col rounded-2xl border border-border bg-linear-to-br ${card.accent} p-6 shadow-sm transition hover:border-primary/25 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/50`}
              >
                <span className="font-display text-xl font-semibold text-foreground">
                  {card.title}
                </span>
                <span className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                  {card.body}
                </span>
                <span className="mt-4 text-sm font-semibold text-primary">
                  Abrir →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section
        aria-labelledby="why-heading"
        className="rounded-2xl border border-border bg-surface-muted/60 px-6 py-8 sm:px-8"
      >
        <h2
          id="why-heading"
          className="font-display text-xl font-semibold text-foreground"
        >
          Por que priorizar alimentos frescos e da estação?
        </h2>
        <p className="mt-3 text-muted leading-relaxed">
          Comer frutas, legumes e verduras no período de colheita tende a
          significar mais sabor, melhor preço e menos impacto ambiental nos
          deslocamentos. Use este site como apoio às suas escolhas no mercado ou
          na feira — combinando informação sazonal com uma lista prática de
          compras.
        </p>
      </section>
    </div>
  );
}
