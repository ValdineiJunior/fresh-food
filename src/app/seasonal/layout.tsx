import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Calendário de alimentos sazonais no Brasil",
  description:
    "Referência por mês: frutas, legumes e verduras da estação no Brasil. Escolha alimentos mais frescos, saborosos e sustentáveis.",
  alternates: { canonical: "/seasonal" },
  openGraph: {
    title: `Alimentos sazonais | ${siteName}`,
    description:
      "Calendário sazonal de hortifruti no Brasil — visão rápida mês a mês.",
    url: "/seasonal",
  },
};

export default function SeasonalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
