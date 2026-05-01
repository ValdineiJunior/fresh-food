export const siteName = "Comida Fresca";

export const siteDescription =
  "Consulte frutas, legumes e verduras da estação no Brasil, monte listas de compra de alimentos frescos e leve hábitos mais saudáveis ao dia a dia.";

export function getSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/$/, "")}`;
  }
  return "http://localhost:3000";
}
