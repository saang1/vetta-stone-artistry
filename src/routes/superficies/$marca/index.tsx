import { useMemo, useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ingenieria } from "@/data/superficies";
import { FilterChip } from "@/components/CatalogoPisos";
import { CATALOGOS, deriveColor } from "@/data/cocinas";
import { absoluteUrl, canonicalLink, ogUrlMeta } from "@/lib/seo";
import { waLink } from "@/lib/whatsapp";

// Orden fijo de despliegue — solo se muestran los colores presentes en cada marca.
const ORDEN_COLORES = ["Blanco", "Gris", "Negro", "Beige", "Dorado", "Verde", "Efecto mármol"];

export const Route = createFileRoute("/superficies/$marca/")({
  head: ({ params }) => {
    const path = `/superficies/${params.marca}`;
    const marca = ingenieria.find((m) => m.slug === params.marca);
    const title = marca ? `${marca.nombre} | VETTA` : "Marca no encontrada | VETTA";
    const description = marca
      ? `Catálogo completo de colores ${marca.nombre}: superficie de ingeniería para cocinas, baños y revestimientos de alta gama por VETTA.`
      : undefined;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        ...(marca ? [{ property: "og:image", content: absoluteUrl(marca.src) }] : []),
        { property: "og:type", content: "website" },
        ogUrlMeta(path),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [canonicalLink(path)],
    };
  },
  component: MarcaRoute,
});

function MarcaRoute() {
  const { marca: slug } = Route.useParams();
  const marca = ingenieria.find((m) => m.slug === slug);
  const piezas = CATALOGOS[slug] ?? [];
  const [colorActivo, setColorActivo] = useState<string | null>(null);

  const coloresDisponibles = useMemo(() => {
    const presentes = new Set(piezas.map((p) => deriveColor(p.nombre)));
    return ORDEN_COLORES.filter((c) => presentes.has(c));
  }, [piezas]);

  const piezasFiltradas = useMemo(
    () => (colorActivo ? piezas.filter((p) => deriveColor(p.nombre) === colorActivo) : piezas),
    [piezas, colorActivo],
  );

  if (!marca) throw notFound();

  const waUrl = waLink(
    `Hola VETTA! Vi el catálogo de ${marca.nombre} en la web y quiero conocer más. ¿Podés asesorarme?`,
  );

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── NAV miga de pan ────────────────────────── */}
      <div className="px-6 pb-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <nav aria-label="Ubicación" className="flex items-center gap-3">
            <Link to="/superficies" className="eyebrow link-underline text-muted-foreground">
              Superficies
            </Link>
            <span className="eyebrow text-border">·</span>
            <span className="eyebrow text-charcoal">{marca.nombre}</span>
          </nav>
        </div>
      </div>

      {/* ── CAMBIAR DE MARCA ───────────────────────── */}
      <div className="px-6 pb-10 md:px-10">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-center gap-2">
          {ingenieria
            .filter((m): m is typeof m & { slug: string } => Boolean(m.slug))
            .map((m) =>
              m.slug === slug ? (
                <span
                  key={m.slug}
                  className="eyebrow border border-charcoal bg-charcoal px-5 py-2 text-stone-bone"
                >
                  {m.nombre}
                </span>
              ) : (
                <Link
                  key={m.slug}
                  to="/superficies/$marca"
                  params={{ marca: m.slug }}
                  className="eyebrow border border-border px-5 py-2 text-muted-foreground transition-colors duration-500 hover:border-charcoal hover:text-charcoal"
                >
                  {m.nombre}
                </Link>
              ),
            )}
        </div>
      </div>

      {/* ── ENCABEZADO ─────────────────────────────── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <div className="h-px w-10 bg-charcoal" />
            <h1 className="display-xl mt-6 text-3xl md:text-5xl">Colores disponibles</h1>
          </Reveal>

          <div className="mt-12 flex items-center justify-between border-y border-border py-4">
            <p className="eyebrow text-charcoal">{marca.nombre}</p>
            <p className="eyebrow text-charcoal/40">
              {piezasFiltradas.length} {piezasFiltradas.length === 1 ? "artículo" : "artículos"}
            </p>
          </div>

          {/* ── FILTRO DE COLOR ─────────────────────── */}
          <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
            <span className="eyebrow mr-1 shrink-0 text-charcoal/40">Color</span>
            <FilterChip
              label="Todo"
              active={colorActivo === null}
              onClick={() => setColorActivo(null)}
            />
            {coloresDisponibles.map((c) => (
              <FilterChip
                key={c}
                label={c}
                active={colorActivo === c}
                onClick={() => setColorActivo((prev) => (prev === c ? null : c))}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── GRILLA DE COLORES ───────────────────────── */}
      <section className="px-6 py-16 md:px-10 md:py-20">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {piezasFiltradas.map((p, i) => (
            <Reveal as="li" key={p.slug} delay={(i % 16) * 30}>
              <Link
                to="/superficies/$marca/$producto"
                params={{ marca: slug, producto: p.slug }}
                className="group block w-full text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
              >
                <span className="block aspect-square overflow-hidden rounded-[10px] bg-muted">
                  <img
                    src={p.imagen}
                    alt={`${p.nombre} — ${marca.nombre}`}
                    width={600}
                    height={600}
                    loading={i < 8 ? "eager" : "lazy"}
                    className="h-full w-full scale-[3.5] object-cover transition-transform duration-[1200ms] ease-out"
                  />
                </span>
                <span className="mt-4 block text-xs font-light text-charcoal md:text-sm">
                  {p.nombre}
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* ── CTA al pie ────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">¿Te gustó algún color?</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">Consultanos por {marca.nombre}</h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Consultar por WhatsApp
            </a>
            <Link to="/superficies" className="eyebrow link-underline text-muted-foreground">
              ← Volver a superficies
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
