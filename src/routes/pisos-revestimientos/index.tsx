import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { useCatalogoFiltrado, CatalogoGrid } from "@/components/CatalogoPisos";
import { canonicalLink, ogUrlMeta } from "@/lib/seo";

const SEO_TITLE = "Pisos y Revestimientos — Catálogo de piedra | VETTA";
const SEO_DESC =
  "Catálogo de mármoles, granitos, cuarcitas, travertinos y porcelanatos trabajados a medida por VETTA. Piezas únicas para pisos y revestimientos de alta gama.";

export const Route = createFileRoute("/pisos-revestimientos/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESC },
      { property: "og:type", content: "website" },
      ogUrlMeta("/pisos-revestimientos"),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonicalLink("/pisos-revestimientos")],
  }),
  component: PisosPage,
});

// ─── PAGE ────────────────────────────────────────────────────────────────────

function PisosPage() {
  const catalogo = useCatalogoFiltrado();
  const { hayFiltros } = catalogo;

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── ENCABEZADO ─────────────────────────────── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-16 md:mb-24">
            <p className="eyebrow text-charcoal">Pisos y Revestimientos</p>
            <h1 className="display-xl mt-5 max-w-xl text-4xl md:text-6xl">El muro de piedra</h1>
            <p className="mt-5 max-w-sm text-sm font-light leading-loose text-muted-foreground md:text-base">
              Mármoles, granitos, cuarcitas, travertinos y porcelanatos. Cada placa, seleccionada a
              mano.
            </p>
          </Reveal>
        </div>
      </section>

      <CatalogoGrid {...catalogo} />

      {/* ── CTA al pie ────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">
            {hayFiltros ? "¿No encontraste lo que buscás?" : "Catálogo completo"}
          </p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">
            {hayFiltros ? "Preguntanos por otras piezas" : "¿Buscás algo específico?"}
          </h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href="https://wa.me/5491100000000?text=Hola%21+Me+gustar%C3%ADa+consultar+sobre+su+cat%C3%A1logo+de+pisos+y+revestimientos."
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Consultar por WhatsApp
            </a>
            <Link to="/contacto" className="eyebrow link-underline text-muted-foreground">
              o envianos un mensaje →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
