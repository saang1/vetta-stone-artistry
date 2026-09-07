import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { MESAS_ITEMS } from "@/data/mesas";
import { absoluteUrl, canonicalLink, ogUrlMeta } from "@/lib/seo";

export const Route = createFileRoute("/mesas/$producto")({
  head: ({ params }) => {
    const item = MESAS_ITEMS.find((i) => i.producto?.slug === params.producto);
    const title = item ? `${item.caption} | VETTA` : "Producto no encontrado | VETTA";
    const description = item?.producto?.descripcion ?? item?.alt;
    const path = `/mesas/${params.producto}`;
    return {
      meta: [
        { title },
        ...(description ? [{ name: "description", content: description }] : []),
        { property: "og:title", content: title },
        ...(description ? [{ property: "og:description", content: description }] : []),
        ...(item ? [{ property: "og:image", content: absoluteUrl(item.src) }] : []),
        { property: "og:type", content: "website" },
        ogUrlMeta(path),
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [canonicalLink(path)],
    };
  },
  component: ProductoRoute,
});

function ProductoRoute() {
  const { producto: slug } = Route.useParams();
  const item = MESAS_ITEMS.find((i) => i.producto?.slug === slug);

  if (!item || !item.producto) throw notFound();
  const { producto } = item;

  const otrosDisponibles = MESAS_ITEMS.filter(
    (i) => i.producto && i.producto.slug !== producto.slug,
  ).slice(0, 4);

  const waUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(
    `Hola! Me interesa la mesa "${item.caption}" (${producto.precio}). ¿Podés darme más información?`,
  )}`;

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── NAV miga de pan ────────────────────────── */}
      <div className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <nav aria-label="Ubicación" className="flex flex-wrap items-center gap-3">
            <Link to="/mesas" className="eyebrow link-underline text-muted-foreground">
              Mesas
            </Link>
            <span className="eyebrow text-border">·</span>
            <span className="eyebrow text-charcoal">{item.caption}</span>
          </nav>
        </div>
      </div>

      {/* ── BLOQUE PRINCIPAL ───────────────────────── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* — Imagen — */}
            <Reveal
              as="figure"
              className="mx-auto w-full min-w-0 max-w-[478px] overflow-hidden bg-muted"
            >
              <img
                src={item.src}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="eager"
                fetchPriority="high"
                className="aspect-square w-full object-cover"
              />
            </Reveal>

            {/* — Info — */}
            <Reveal delay={120} className="flex min-w-0 flex-col justify-start pt-0 lg:pt-4">
              <p className="eyebrow text-charcoal">Disponible</p>
              <h1 className="display-xl mt-3 text-3xl sm:text-4xl md:text-5xl">{item.caption}</h1>
              <p className="eyebrow mt-3 text-charcoal/40">{producto.precio}</p>

              <div className="hairline my-8" />

              {producto.descripcion && (
                <p className="text-sm font-light leading-loose text-muted-foreground">
                  {producto.descripcion}
                </p>
              )}

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={waUrl}
                  className="eyebrow border border-charcoal px-10 py-5 text-center text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
                >
                  Consultar por WhatsApp
                </a>
                <Link
                  to="/mesas"
                  className="eyebrow border border-border px-10 py-5 text-center text-muted-foreground transition-all duration-700 hover:border-charcoal hover:text-charcoal"
                >
                  ← Volver a la galería
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OTRAS PIEZAS DISPONIBLES ───────────────── */}
      {otrosDisponibles.length > 0 && (
        <section className="mt-24 border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-12">
              <p className="eyebrow text-charcoal">También disponibles</p>
              <h2 className="display-xl mt-4 text-2xl md:text-3xl">Otras mesas en stock</h2>
            </Reveal>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {otrosDisponibles.map((rel) => (
                <li key={rel.producto!.slug}>
                  <Link
                    to="/mesas/$producto"
                    params={{ producto: rel.producto!.slug }}
                    className="group block w-full text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
                  >
                    <span className="block aspect-square overflow-hidden rounded-[10px] bg-muted">
                      <img
                        src={rel.src}
                        alt={rel.alt}
                        width={600}
                        height={600}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      />
                    </span>
                    <span className="mt-4 block text-xs font-light text-charcoal md:text-sm">
                      {rel.caption}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA final ──────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Proyectos a medida</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">
            ¿Buscás algo distinto?
            <br />
            Diseñemos juntos
          </h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Link
              to="/contacto"
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Hablar con un especialista
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
