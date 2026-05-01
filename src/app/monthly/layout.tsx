import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Frutas e verduras da estação por mês",
  description:
    "Selecione o mês e veja a lista completa de frutas, legumes e verduras em safra. Ideal para planejar refeições e compras saudáveis.",
  alternates: { canonical: "/monthly" },
  openGraph: {
    title: `Safra por mês | ${siteName}`,
    description:
      "Listas completas de hortifruti da estação, mês a mês, no Brasil.",
    url: "/monthly",
  },
};

export default function MonthlyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
