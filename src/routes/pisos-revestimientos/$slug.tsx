import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { piezas } from "@/data/pisos";

export const Route = createFileRoute("/pisos-revestimientos/$slug")({
  head: ({ params }) => {
    const pieza = piezas.find((p) => p.slug === params.slug);
    if (!pieza)
      return {
        meta: [{ title: "Pieza no encontrada | VETTA" }],
      };
    const title = `${pieza.nombre} — ${pieza.tipo} | VETTA`;
    return {
      meta: [
        { title },
        { name: "description", content: (pieza.descripcion ?? "").slice(0, 160) },
        { property: "og:title", content: title },
        ...(pieza.imagen ? [{ property: "og:image", content: pieza.imagen }] : []),
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DetalleRoute,
});

// ─── Ícono corazón ─────────────────────────────────────────────────────────
function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={20}
      height={20}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

// ─── Fila de especificación ────────────────────────────────────────────────
function SpecRow({ label, value }: { label: string; value: string | undefined }) {
  if (!value) return null;
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 border-t border-border py-4 sm:grid-cols-[140px_1fr]">
      <span className="eyebrow pt-0.5 text-charcoal/50">{label}</span>
      <span className="text-sm font-light leading-relaxed">{value}</span>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────

function DetalleRoute() {
  const { slug } = Route.useParams();
  const pieza = piezas.find((p) => p.slug === slug);

  if (!pieza) throw notFound();

  const [activoImg, setActivoImg] = useState(0);
  const [favorito, setFavorito] = useState(false);

  const todasLasImagenes = pieza.imagen ? [pieza.imagen, ...(pieza.miniaturas ?? []).slice(1)] : [];

  // Versión 400 px de la galería para la tira de miniaturas. Las piezas viejas
  // no tienen thumbs: en ese caso se reusa la imagen grande.
  const todasLasMiniaturas =
    pieza.thumbs?.length === todasLasImagenes.length ? pieza.thumbs : todasLasImagenes;

  const relacionadas = piezas
    .filter((p) => p.tipo === pieza.tipo && p.slug !== pieza.slug)
    .slice(0, 4);

  const waUrl = `https://wa.me/5491100000000?text=Hola%21+Me+interesa+la+pieza+${encodeURIComponent(
    pieza.nombre,
  )}${pieza.sku ? `+(${encodeURIComponent(pieza.sku)})` : ""}.+%C2%BFPod%C3%A9s+asesorarme%3F`;

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── NAV miga de pan ────────────────────────── */}
      <div className="px-6 pb-10 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <nav aria-label="Ubicación" className="flex flex-wrap items-center gap-3">
            <Link
              to="/pisos-revestimientos/"
              className="eyebrow link-underline text-muted-foreground"
            >
              Pisos y Revestimientos
            </Link>
            <span className="eyebrow text-border">·</span>
            <span className="eyebrow text-charcoal">{pieza.nombre}</span>
          </nav>
        </div>
      </div>

      {/* ── BLOQUE PRINCIPAL ───────────────────────── */}
      <section className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <div className="grid min-w-0 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
            {/* — Columna izquierda: galería ——————————— */}
            <div className="mx-auto w-full min-w-0 max-w-none">
              {/* Imagen principal */}
              <div className="relative h-[420px] overflow-hidden bg-muted sm:h-[480px] md:h-[560px]">
                {todasLasImagenes.length > 0 ? (
                  <>
                    <img
                      key={activoImg}
                      src={todasLasImagenes[activoImg]}
                      alt={`${pieza.nombre} — vista ${activoImg + 1}`}
                      width={1200}
                      height={1200}
                      loading="eager"
                      fetchPriority="high"
                      className="h-full w-full object-cover object-center transition-opacity duration-700"
                    />
                    <span className="eyebrow absolute bottom-4 right-4 text-stone-bone/60">
                      {String(activoImg + 1).padStart(2, "0")} /{" "}
                      {String(todasLasImagenes.length).padStart(2, "0")}
                    </span>
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="eyebrow text-charcoal/30">Imagen próxima</span>
                  </div>
                )}
              </div>

              {/* Miniaturas */}
              {todasLasImagenes.length > 1 && (
                <div className="mt-2 flex gap-2 overflow-x-auto py-2 scrollbar-none">
                  {todasLasImagenes.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActivoImg(i)}
                      aria-label={`Ver imagen ${i + 1}`}
                      className={`relative aspect-square w-20 shrink-0 overflow-hidden transition-all duration-300 ${
                        activoImg === i
                          ? "ring-1 ring-charcoal ring-offset-2"
                          : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <img
                        src={todasLasMiniaturas[i] ?? src}
                        alt=""
                        width={160}
                        height={160}
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* ── MATERIAL APLICADO ─────────────────── */}
              <div className="mt-8">
                <div className="relative aspect-[4/3] max-w-[750px] w-full overflow-hidden bg-muted">
                  {pieza.imagenAplicada ? (
                    <img
                      src={pieza.imagenAplicada}
                      alt={`${pieza.nombre} aplicado en un espacio real`}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center">
                      <span className="eyebrow text-charcoal/30">Foto de aplicación próxima</span>
                    </div>
                  )}
                </div>
                <p className="eyebrow mt-4 text-charcoal/50">{pieza.nombre} aplicado</p>
              </div>
            </div>

            {/* — Columna derecha: info ————————————————— */}
            <Reveal className="flex min-w-0 flex-col justify-start pt-0 lg:pt-4">
              {/* Encabezado */}
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="eyebrow text-charcoal">{pieza.tipo}</p>
                  <h1 className="display-xl mt-3 text-3xl sm:text-4xl md:text-5xl">
                    {pieza.nombre}
                  </h1>
                </div>
                <button
                  type="button"
                  onClick={() => setFavorito((v) => !v)}
                  aria-label={favorito ? "Quitar de favoritos" : "Agregar a favoritos"}
                  className={`-m-2 mt-0 shrink-0 rounded-full p-2 transition-colors duration-300 ${
                    favorito ? "text-charcoal" : "text-border hover:text-charcoal"
                  }`}
                >
                  <HeartIcon filled={favorito} />
                </button>
              </div>
              {pieza.sku && <p className="eyebrow mt-3 text-charcoal/40">{pieza.sku}</p>}

              {/* Separador */}
              <div className="hairline my-8" />

              {/* Ficha técnica */}
              <div>
                <SpecRow label="Marca" value={pieza.marca} />
                <SpecRow label="Colección" value={pieza.coleccion} />
                <SpecRow label="Origen" value={pieza.origen} />
                <SpecRow label="Tamaño" value={pieza.tamaño} />
                <SpecRow label="Espesor" value={pieza.espesor} />
                <SpecRow label="Acabado" value={pieza.acabado} />
              </div>

              {/* Descripción */}
              {pieza.descripcion && (
                <>
                  <div className="hairline my-8" />
                  <p className="text-sm font-light leading-loose text-muted-foreground">
                    {pieza.descripcion}
                  </p>
                </>
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
                  to="/contacto"
                  className="eyebrow border border-border px-10 py-5 text-center text-muted-foreground transition-all duration-700 hover:border-charcoal hover:text-charcoal"
                >
                  Enviar una consulta
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SUPERFICIES RELACIONADAS ───────────────── */}
      {relacionadas.length > 0 && (
        <section className="mt-24 border-t border-border px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="mb-12">
              <p className="eyebrow text-charcoal">Superficies relacionadas</p>
              <h2 className="display-xl mt-4 text-2xl md:text-3xl">
                Más {pieza.tipo.toLowerCase()}s
              </h2>
            </Reveal>

            <ul className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {relacionadas.map((rel) => (
                <li key={rel.slug}>
                  <Link
                    to="/pisos-revestimientos/$slug"
                    params={{ slug: rel.slug }}
                    className="group block w-full text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
                  >
                    <span className="block aspect-square overflow-hidden rounded-[10px] bg-muted">
                      {rel.imagen && (
                        <img
                          src={rel.imagen}
                          srcSet={rel.thumb ? `${rel.thumb} 400w, ${rel.imagen} 1200w` : undefined}
                          sizes="(min-width: 768px) 25vw, 50vw"
                          alt={rel.nombre}
                          width={600}
                          height={600}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                        />
                      )}
                    </span>
                    <span className="mt-4 block text-xs font-light text-charcoal md:text-sm">
                      {rel.nombre}
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
            ¿Esta es tu piedra?
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
            <Link
              to="/pisos-revestimientos/"
              className="eyebrow link-underline text-muted-foreground"
            >
              ← Volver al catálogo
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
