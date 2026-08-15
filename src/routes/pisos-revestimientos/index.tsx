import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  piezas,
  MATERIALES,
  TONOS,
  type Material,
  type Tono,
} from "@/data/pisos";

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
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PisosPage,
});

// ─── HOOK de filtrado — reutilizable por cualquier página que muestre el catálogo ──
export function useCatalogoFiltrado() {
  const [activoTipo, setActivoTipo] = useState<Material | null>(null);
  const [activoTono, setActivoTono] = useState<Tono | null>(null);

  const filtradas = useMemo(
    () =>
      piezas.filter((p) => {
        if (activoTipo && p.tipo !== activoTipo) return false;
        if (activoTono && p.tono !== activoTono) return false;
        return true;
      }),
    [activoTipo, activoTono]
  );

  const grupos = useMemo(
    () =>
      MATERIALES.map((m) => ({
        material: m,
        items: filtradas.filter((p) => p.tipo === m),
      })).filter((g) => g.items.length > 0),
    [filtradas]
  );

  const hayFiltros = activoTipo !== null || activoTono !== null;

  return { activoTipo, activoTono, setActivoTipo, setActivoTono, grupos, hayFiltros };
}

// ─── CHIP de filtro ───────────────────────────────────────────────────────────
export function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`eyebrow shrink-0 border px-5 py-2 transition-colors duration-500 ${
        active
          ? "border-charcoal bg-charcoal text-stone-bone"
          : "border-border text-muted-foreground hover:border-charcoal hover:text-charcoal"
      }`}
    >
      {label}
    </button>
  );
}

// ─── TARJETA de pieza ─────────────────────────────────────────────────────────
export function PiezaCard({ pieza, index }: { pieza: (typeof piezas)[0]; index: number }) {
  return (
    <Link
      to="/pisos-revestimientos/$slug"
      params={{ slug: pieza.slug }}
      className="group block cursor-pointer"
    >
      {/* Imagen */}
      <div className="relative aspect-square overflow-hidden md:aspect-[4/3]">
        <img
          src={pieza.imagen}
          alt={`${pieza.nombre} — ${pieza.tipo}`}
          width={800}
          height={600}
          loading={index < 6 ? "eager" : "lazy"}
          className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
        />
        {/* Overlay desktop — visible al hover */}
        <div className="absolute inset-x-0 bottom-0 hidden translate-y-1 flex-col bg-gradient-to-t from-charcoal/85 to-transparent px-4 py-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 md:flex">
          <span className="eyebrow text-stone-bone/70">{pieza.tipo}</span>
          <span className="mt-1 font-display text-xl font-light text-stone-bone">
            {pieza.nombre}
          </span>
        </div>
      </div>
      {/* Label mobile — siempre visible bajo la imagen */}
      <div className="pt-3 md:hidden">
        <span className="eyebrow block text-charcoal/60">{pieza.tipo}</span>
        <span className="mt-1 block font-display text-lg font-light">
          {pieza.nombre}
        </span>
      </div>
    </Link>
  );
}

// ─── GRILLA de catálogo (barra de filtros + placas) — reutilizable ────────────
export function CatalogoGrid({
  activoTipo,
  activoTono,
  setActivoTipo,
  setActivoTono,
  grupos,
}: ReturnType<typeof useCatalogoFiltrado>) {
  return (
    <>
      {/* ── BARRA DE FILTROS — sticky ───────────────── */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="mx-auto max-w-[1600px] px-6 md:px-10">
          {/* Fila 1: Material / Producto */}
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-none">
            <span className="eyebrow mr-1 shrink-0 text-charcoal/40">
              Producto
            </span>
            <FilterChip
              label="Todo"
              active={activoTipo === null && activoTono === null}
              onClick={() => {
                setActivoTipo(null);
                setActivoTono(null);
              }}
            />
            {MATERIALES.map((m) => (
              <FilterChip
                key={m}
                label={m}
                active={activoTipo === m}
                onClick={() =>
                  setActivoTipo((prev) => (prev === m ? null : m))
                }
              />
            ))}
          </div>
          {/* Fila 2: Tono */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            <span className="eyebrow mr-1 shrink-0 text-charcoal/40">
              Tono
            </span>
            {TONOS.map((t) => (
              <FilterChip
                key={t}
                label={t}
                active={activoTono === t}
                onClick={() =>
                  setActivoTono((prev) => (prev === t ? null : t))
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── GRILLA POR MATERIAL ────────────────────── */}
      {grupos.length === 0 ? (
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6 px-6 py-32 text-center">
          <p className="eyebrow">Sin resultados</p>
          <p className="text-sm font-light text-muted-foreground">
            No hay piezas con esa combinación de filtros.
          </p>
          <button
            type="button"
            onClick={() => {
              setActivoTipo(null);
              setActivoTono(null);
            }}
            className="eyebrow border border-charcoal px-8 py-4 text-charcoal transition-colors duration-500 hover:bg-charcoal hover:text-stone-bone"
          >
            Ver todas las superficies
          </button>
        </div>
      ) : (
        grupos.map(({ material, items }, gi) => (
          <section key={material} aria-label={material}>
            {/* Título de sección */}
            <div className="px-6 pb-8 pt-20 md:px-10 md:pb-10 md:pt-28">
              <div className="mx-auto max-w-[1600px] flex items-center gap-6">
                <span className="eyebrow text-charcoal">{material}</span>
                <div className="h-px flex-1 bg-border" />
                <span className="eyebrow text-charcoal/40">
                  {items.length}{" "}
                  {items.length === 1 ? "pieza" : "piezas"}
                </span>
              </div>
            </div>

            {/* Grid edge-to-edge */}
            <div className="grid grid-cols-2 gap-[2px] bg-border md:grid-cols-3">
              {items.map((pieza, i) => (
                <div key={pieza.slug} className="bg-background">
                  <PiezaCard
                    pieza={pieza}
                    index={gi * 10 + i}
                  />
                </div>
              ))}
            </div>

            {/* Aire al pie de cada grupo */}
            <div className="h-8 md:h-12" />
          </section>
        ))
      )}
    </>
  );
}

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
            <h1 className="display-xl mt-5 max-w-xl text-4xl md:text-6xl">
              El muro de piedra
            </h1>
            <p className="mt-5 max-w-sm text-sm font-light leading-loose text-muted-foreground md:text-base">
              Mármoles, granitos, cuarcitas, travertinos y porcelanatos.
              Cada placa, seleccionada a mano.
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
            {hayFiltros
              ? "Preguntanos por otras piezas"
              : "¿Buscás algo específico?"}
          </h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href="https://wa.me/5491100000000?text=Hola%21+Me+gustar%C3%ADa+consultar+sobre+su+cat%C3%A1logo+de+pisos+y+revestimientos."
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Consultar por WhatsApp
            </a>
            <Link
              to="/contacto"
              className="eyebrow link-underline text-muted-foreground"
            >
              o envianos un mensaje →
            </Link>
          </div>
        </Reveal>
      </section>
    </main>
  );
}
