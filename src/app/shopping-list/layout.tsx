import type { Metadata } from "next";
import { siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lista de compras de frutas e verduras",
  description:
    "Crie listas de compra com frutas, legumes e verduras frescas. Sugestões sazonais, copiar texto e imprimir para levar ao mercado ou à feira.",
  alternates: { canonical: "/shopping-list" },
  openGraph: {
    title: `Lista de compras | ${siteName}`,
    description:
      "Monte e salve listas de hortifruti no navegador, com sugestões de alimentos da estação.",
    url: "/shopping-list",
  },
};

export default function ShoppingListLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
