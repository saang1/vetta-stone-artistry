// Helpers de SEO compartidos entre rutas — dominio único de referencia para
// canonical, og:url y URLs absolutas de imágenes.

export const SITE_URL = "https://conceptovetta.com";

/** Convierte un path relativo ("/materiales") en una URL absoluta del sitio. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Link tag <link rel="canonical" href="..."> para un path dado. */
export function canonicalLink(path: string) {
  return { rel: "canonical", href: absoluteUrl(path) };
}

/** Meta og:url para un path dado. */
export function ogUrlMeta(path: string) {
  return { property: "og:url", content: absoluteUrl(path) };
}
