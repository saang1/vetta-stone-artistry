import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import {
  piezas,
  MATERIALES,
  TONOS,
  MARCAS,
  LOGOS_MARCA,
  type Material,
  type Tono,
} from "@/data/pisos";

// ─── HOOK de filtrado — reutilizable por cualquier página que muestre el catálogo ──
export function useCatalogoFiltrado() {
  const [activoTipo, setActivoTipo] = useState<Material | null>(null);
  const [activoTono, setActivoTono] = useState<Tono | null>(null);

  const piezasFiltradas = useMemo(
    () =>
      piezas.filter((p) => {
        if (activoTipo && p.tipo !== activoTipo) return false;
        if (activoTono && p.tono !== activoTono) return false;
        return true;
      }),
    [activoTipo, activoTono]
  );

  const hayFiltros = activoTipo !== null || activoTono !== null;

  return { activoTipo, activoTono, setActivoTipo, setActivoTono, piezasFiltradas, hayFiltros };
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

// ─── TARJETA de pieza — mismo formato que el catálogo de cocinas ──────────────
export function PiezaCard({ pieza, index }: { pieza: (typeof piezas)[0]; index: number }) {
  const etiqueta = pieza.marca ? `${pieza.tipo} · ${pieza.marca}` : pieza.tipo;

  return (
    <Link
      to="/pisos-revestimientos/$slug"
      params={{ slug: pieza.slug }}
      className="group block w-full text-center transition-transform duration-500 ease-out hover:-translate-y-1.5"
    >
      {/* Imagen */}
      <span className="block aspect-square overflow-hidden rounded-[10px] bg-muted">
        {pieza.imagen ? (
          <img
            src={pieza.imagen}
            srcSet={pieza.thumb ? `${pieza.thumb} 400w, ${pieza.imagen} 1200w` : undefined}
            sizes="(min-width: 768px) 20vw, 50vw"
            alt={`${pieza.nombre} — ${pieza.tipo}`}
            width={800}
            height={800}
            loading={index < 8 ? "eager" : "lazy"}
            className="h-full w-full object-cover object-center transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="eyebrow text-charcoal/30">Imagen próxima</span>
          </div>
        )}
      </span>
      {/* Label — siempre visible bajo la imagen */}
      <span className="mt-4 block text-xs font-light text-charcoal md:text-sm">
        {pieza.nombre}
      </span>
      <span className="eyebrow mt-1 block text-charcoal/50">{etiqueta}</span>
      {pieza.formatos.length > 1 && (
        <span className="eyebrow mt-1 block text-charcoal/40">
          {pieza.formatos.length} formatos
        </span>
      )}
    </Link>
  );
}

// ─── ENCABEZADO de marca — separación fina entre marcas, con el logo de la
// marca (el texto institucional está comentado hasta tenerlo) ──
function MarcaHeader({ marca }: { marca: string }) {
  const logo = LOGOS_MARCA[marca];
  return (
    <div className="px-6 pb-10 pt-16 md:px-10 md:pb-14 md:pt-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-charcoal/40">Marca</p>
          <h2 className="display-xl mt-4 text-3xl md:text-4xl">
            {logo ? (
              // Tope de alto y de ancho: así un logo alto (Eliane) y uno muy
              // apaisado (Decortiles) quedan con un peso visual parecido.
              <img
                src={logo.src}
                alt={marca}
                width={logo.ancho}
                height={logo.alto}
                className="h-auto max-h-10 w-auto max-w-[180px] md:max-h-12 md:max-w-[230px]"
              />
            ) : (
              marca
            )}
          </h2>
        </div>
        {/* TEXTO INSTITUCIONAL DESACTIVADO POR AHORA — para volver a mostrarlo,
            borrar la apertura de este comentario y su cierre, debajo del párrafo.

        <p className="max-w-sm text-sm font-light italic leading-relaxed text-muted-foreground/70">
          Información institucional de {marca} — próximamente.
        </p>
        */}
      </div>
    </div>
  );
}

// ─── GRILLA de catálogo (barra de filtros + placas agrupadas por marca) ──────
export function CatalogoGrid({
  activoTipo,
  activoTono,
  setActivoTipo,
  setActivoTono,
  piezasFiltradas,
}: ReturnType<typeof useCatalogoFiltrado>) {
  const gruposPorMarca = useMemo(() => {
    const orden = [...MARCAS, "Sin marca"];
    return orden
      .map((marca) => ({
        marca,
        items: piezasFiltradas.filter((p) => (p.marca ?? "Sin marca") === marca),
      }))
      .filter((g) => g.items.length > 0);
  }, [piezasFiltradas]);

  return (
    <>
      {/* ── BARRA DE FILTROS (desactivada) + contador ── */}
      <div className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          {/* FILTROS DESACTIVADOS POR AHORA — para volver a usarlos, borrar la
              apertura de este comentario y su cierre, después de la Fila 2.

          Fila 1: Material / Producto
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
          Fila 2: Tono
          <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
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
          */}
          <div className="flex items-center justify-between border-y border-border py-4">
            <p className="eyebrow text-charcoal/40">
              {piezasFiltradas.length} {piezasFiltradas.length === 1 ? "pieza" : "piezas"}
            </p>
          </div>
        </div>
      </div>

      {/* ── GRILLA ───────────────────────────────────── */}
      {piezasFiltradas.length === 0 ? (
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
        gruposPorMarca.map(({ marca, items }, gi) => (
          <div key={marca}>
            {gi > 0 && (
              <div className="mx-auto max-w-[1600px] px-6 md:px-10">
                <div className="hairline" />
              </div>
            )}
            <MarcaHeader marca={marca} />
            <section className="px-6 pb-16 md:px-10 md:pb-20">
              <ul className="mx-auto grid max-w-[1600px] grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
                {items.map((pieza, i) => (
                  <Reveal as="li" key={pieza.slug} delay={(i % 16) * 30}>
                    <PiezaCard pieza={pieza} index={gi * 100 + i} />
                  </Reveal>
                ))}
              </ul>
            </section>
          </div>
        ))
      )}
    </>
  );
}
