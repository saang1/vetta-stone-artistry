import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ingenieria } from "@/routes/superficies/index";
import { CATALOGOS } from "@/routes/superficies/$marca/index";

export const Route = createFileRoute("/superficies/$marca/$producto")({
  head: ({ params }) => {
    const marca = ingenieria.find((m) => m.slug === params.marca);
    const producto = marca
      ? (CATALOGOS[params.marca] ?? []).find((p) => p.slug === params.producto)
      : undefined;
    const title =
      producto && marca
        ? `${producto.nombre} — ${marca.nombre} | VETTA`
        : "Producto no encontrado | VETTA";
    return {
      meta: [{ title }, ...(producto ? [{ property: "og:image", content: producto.imagen }] : [])],
    };
  },
  component: ProductoRoute,
});

function ProductoRoute() {
  const { marca: marcaSlug, producto: productoSlug } = Route.useParams();
  const marca = ingenieria.find((m) => m.slug === marcaSlug);
  const piezas = CATALOGOS[marcaSlug] ?? [];
  const producto = piezas.find((p) => p.slug === productoSlug);

  if (!marca || !producto) throw notFound();

  const relacionados = piezas.filter((p) => p.slug !== producto.slug).slice(0, 4);

  const waUrl = `https://wa.me/5491100000000?text=${encodeURIComponent(
    `Hola! Me interesa el color ${producto.nombre} de ${marca.nombre}. ¿Podés asesorarme?`,
  )}`;

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── NAV miga de pan ────────────────────────── */}
      <div className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <nav aria-label="Ubicación" className="flex flex-wrap items-center gap-3">
            <Link to="/superficies" className="eyebrow link-underline text-muted-foreground">
              Superficies
            </Link>
            <span className="eyebrow text-border">·</span>
            <Link
              to="/superficies/$marca"
              params={{ marca: marcaSlug }}
              className="eyebrow link-underline text-muted-foreground"
            >
              {marca.nombre}
            </Link>
            <span className="eyebrow text-border">·</span>
            <span className="eyebrow text-charcoal">{producto.nombre}</span>
          </nav>
        </div>
      </div>

      {/* ── BLOQUE PRINCIPAL ───────────────────────── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* — Imagen — */}
            <div className="mx-auto w-full min-w-0 max-w-none">
              <Reveal as="figure" className="overflow-hidden bg-muted">
                <img
                  src={producto.imagen}
                  alt={`${producto.nombre} — ${marca.nombre}`}
                  width={1300}
                  height={1200}
                  loading="eager"
                  fetchPriority="high"
                  className="h-[420px] w-full object-cover sm:h-[480px] md:h-[560px]"
                />
              </Reveal>

              {/* ── MATERIAL APLICADO ─────────────────── */}
              <div className="mt-8">
                <div className="relative aspect-[4/3] max-w-[750px] w-full overflow-hidden bg-muted">
                  {producto.imagenAplicada ? (
                    <img
                      src={producto.imagenAplicada}
                      alt={`${producto.nombre} aplicado en un espacio real`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="eyebrow text-charcoal/30">Foto de aplicación próxima</span>
                    </div>
                  )}
                </div>
                <p className="eyebrow mt-4 text-charcoal/50">{producto.nombre} aplicado</p>
              </div>
            </div>

            {/* — Info — */}
            <Reveal delay={120} className="flex min-w-0 flex-col justify-start pt-0 lg:pt-4">
              <p className="eyebrow text-charcoal">{marca.nombre}</p>
              <h1 className="display-xl mt-3 text-3xl sm:text-4xl md:text-5xl">
                {producto.nombre}
              </h1>

              <div className="hairline my-8" />

              <p className="text-sm font-light leading-loose text-muted-foreground">
                Superficie de ingeniería {marca.nombre}. Consultanos por disponibilidad, formatos y
                espesores para tu proyecto.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col gap-4">
                <a
                  href={waUrl}
                  className="eyebrow border border-charcoal px-10 py-5 text-center text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
                >
                  Consultar por WhatsApp
                </a>
                <Link
                  to="/superficies/$marca"
                  params={{ marca: marcaSlug }}
                  className="eyebrow border border-border px-10 py-5 text-center text-muted-foreground transition-all duration-700 hover:border-charcoal hover:text-charcoal"
                >
                  ← Volver al catálogo de {marca.nombre}
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── OTROS COLORES DE LA MARCA ───────────────── */}
      {relacionados.length > 0 && (
        <section className="mt-24 border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-12">
              <p className="eyebrow text-charcoal">También en {marca.nombre}</p>
              <h2 className="display-xl mt-4 text-2xl md:text-3xl">Otros colores</h2>
            </Reveal>

            <div className="grid grid-cols-2 gap-[2px] bg-border md:grid-cols-4">
              {relacionados.map((rel) => (
                <Link
                  key={rel.slug}
                  to="/superficies/$marca/$producto"
                  params={{ marca: marcaSlug, producto: rel.slug }}
                  className="group block bg-background"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={rel.imagen}
                      alt={rel.nombre}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="h-full w-full scale-[3.5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[3.6]"
                    />
                  </div>
                  <div className="pt-3 text-center">
                    <span className="mt-1 block font-display text-base font-light">
                      {rel.nombre}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA final ──────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Proyectos a medida</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">
            ¿Este es tu color?
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
