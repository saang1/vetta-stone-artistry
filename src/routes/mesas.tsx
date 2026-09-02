import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { GalleryCell } from "@/components/GalleryCell";

const SEO_TITLE = "Mesas a medida — Galería de inspiración | VETTA";
const SEO_DESC =
  "Galería editorial de mesas de mármol, travertino y piedra noble a medida por VETTA.";

export const Route = createFileRoute("/mesas")({
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
  component: MesasPage,
});

// ─── DATA ────────────────────────────────────────────────────────────────────
//
// Convención de nombres de archivo en /public/images/mesas/:
//   *-vert-*  →  vertical 3:4   (col-span-1, row-span-2)
//   *-pano-*  →  panorámica 16:9 (col-span-2, row-span-1)
//   *-sq-*    →  cuadrada 1:1   (col-span-1, row-span-1)
//
// Para cambiar el ritmo del mosaico, reordenar los objetos de este array.
// El span de cada celda está declarado en MESAS_CELLS (más abajo).

const images: LightboxItem[] = [
  // [0] vert-01 — portrait tall (posición A en la grilla)
  {
    src: "/images/mesas/mesa-vert-01.png",
    alt: "Mesa de mármol Calacatta con veta continua",
    caption: "Mármol Calacatta",
    width: 900,
    height: 1200,
  },
  // [1] pano-01 — panorámica (posición B)
  {
    src: "/images/mesas/mesa-pano-04.png",
    alt: "Mesa de comedor en travertino romano",
    caption: "Travertino romano",
    width: 1600,
    height: 900,
  },
  // [2] vert-02 — portrait tall (posición C)
  {
    src: "/images/mesas/mesa-vert-02.png",
    alt: "Mesa de mármol negro Marquina con base de acero",
    caption: "Mármol negro Marquina",
    width: 900,
    height: 1200,
  },
  // [3] sq-01 — cuadrada (posición D)
  {
    src: "/images/mesas/mesa-sq-01.png",
    alt: "Detalle de canto vivo en mármol blanco",
    caption: "Canto vivo",
    width: 1000,
    height: 1000,
  },
  // [4] sq-02 — cuadrada (posición E)
  {
    src: "/images/mesas/mesa-sq-02.png",
    alt: "Travertino romano con porosidad natural",
    caption: "Travertino",
    width: 1000,
    height: 1000,
  },
  // [5] pano-02 — panorámica (posición F)
  {
    src: "/images/mesas/mesa-pano-01.png",
    alt: "Mesa ratona de mármol crema con base de acero",
    caption: "Mármol crema",
    width: 1600,
    height: 900,
  },
  // [6] vert-03 — portrait tall (posición G)
  {
    src: "/images/mesas/mesa-vert-03.png",
    alt: "Ónix retroiluminado en mesa de autor",
    caption: "Ónix retroiluminado",
    width: 900,
    height: 1200,
  },
  // [7] sq-03 — cuadrada (posición H)
  {
    src: "/images/mesas/mesa-sq-03.png",
    alt: "Canto con buña en mármol blanco",
    caption: "Canto con buña",
    width: 1000,
    height: 1000,
  },
  // [8] pano-03 — panorámica (posición I)
  {
    src: "/images/mesas/mesa-pano-03.png",
    alt: "Mesa de reunión en granito negro absoluto",
    caption: "Granito negro absoluto",
    width: 1600,
    height: 900,
  },
  // [9] vert-04 — portrait en celda cuadrada: object-cover cropea al centro (posición J)
  {
    src: "/images/mesas/mesa-vert-04.png",
    alt: "Detalle de veta de mármol Statuario",
    caption: "Mármol Statuario",
    width: 900,
    height: 1200,
  },
  // [10] sq-04 — cuadrada (posición K)
  {
    src: "/images/mesas/mesa-sq-04.jpg",
    alt: "Mesa redonda en mármol Rosso Levanto con base cilíndrica de bronce",
    caption: "Rosso Levanto",
    width: 2500,
    height: 2500,
  },
  // [11] vert-05 — portrait (posición L)
  {
    src: "/images/mesas/mesa-vert-05.jpg",
    alt: "Detalle de canto de mesa en travertino sobre base de madera",
    caption: "Travertino",
    width: 1440,
    height: 1777,
  },
  // [12] pano-05 — video panorámico (posición M)
  {
    src: "/images/mesas/mesa-pano-05.mp4",
    alt: "Video del veteado natural del travertino",
    caption: "Travertino en detalle",
    width: 1280,
    height: 720,
    video: true,
  },
  // [13] pano-06 — video panorámico (posición N)
  {
    src: "/images/mesas/mesa-pano-06.mp4",
    alt: "Video de detalle de mesa a medida",
    caption: "Detalle de mesa",
    width: 1280,
    height: 720,
    video: true,
  },
];

// ─── GRID CONFIG ─────────────────────────────────────────────────────────────
//
// Desktop (4 cols, auto-rows 300px) — misma estructura que Baños:
//
//   col: 1    2    3    4
//   r1: [A ] [B B] [C ]    ← vert + pano + vert
//   r2: [A ] [D ] [E ] [C] ← vert-cont + sq + sq + vert-cont
//   r3: [F F] [G ] [H ]    ← pano + vert + sq
//   r4: [I I] [G ] [J ]    ← pano + vert-cont + sq (portrait en celda sq)
//   r5: [K ] [L ] [M M]    ← sq + vert + pano(video)
//   r6: [N N] [L ]         ← pano(video) + vert-cont
//
// Mobile (2 cols, auto-rows 200px, dense):
//   Algoritmo dense agrupa los items sin huecos:
//   r1-2: [A][C]  r3:[B B]  r4:[D][E]  r5:[F F]  r6-7:[G][H/J]  r8:[I I]
//   r9-10: [K][L]  r11:[M M]  r12:[N N]
//
// [10]-[13] son los 4 archivos agregados el 2026-09-01 (2 fotos + 2 videos
// mp4 en loop silenciado). "Rosso Levanto" y "Travertino" son inferencias
// visuales del material, no datos de catálogo confirmados.

const MESAS_CELLS: Array<{ cls: string; priority?: boolean }> = [
  // A — vert-01, portrait tall 1×2
  { cls: "col-span-1 row-span-2", priority: true },
  // B — pano-01, panorámica 2×1
  { cls: "col-span-2 row-span-1", priority: true },
  // C — vert-02, portrait tall 1×2
  { cls: "col-span-1 row-span-2", priority: true },
  // D — sq-01, cuadrada 1×1
  { cls: "col-span-1 row-span-1" },
  // E — sq-02, cuadrada 1×1
  { cls: "col-span-1 row-span-1" },
  // F — pano-02, panorámica 2×1
  { cls: "col-span-2 row-span-1" },
  // G — vert-03, portrait tall 1×2
  { cls: "col-span-1 row-span-2" },
  // H — sq-03, cuadrada 1×1
  { cls: "col-span-1 row-span-1" },
  // I — pano-03, panorámica 2×1
  { cls: "col-span-2 row-span-1" },
  // J — vert-04, portrait en celda cuadrada 1×1 (object-cover)
  { cls: "col-span-1 row-span-1" },
  // K — sq-04, cuadrada 1×1
  { cls: "col-span-1 row-span-1" },
  // L — vert-05, portrait tall 1×2
  { cls: "col-span-1 row-span-2" },
  // M — pano-05, video panorámico 2×1
  { cls: "col-span-2 row-span-1" },
  // N — pano-06, video panorámico 2×1
  { cls: "col-span-2 row-span-1" },
];

// ─── PAGE ────────────────────────────────────────────────────────────────────

function MesasPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="bg-background pt-28 md:pt-36">
      {/* ── ENCABEZADO ─────────────────────────────── */}
      <section aria-label="Mesas a medida" className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">
          <Reveal className="mb-14 md:mb-20">
            <p className="eyebrow text-charcoal">Mesas a medida</p>
            <h1 className="display-xl mt-5 max-w-lg text-4xl md:text-6xl">
              La superficie que define el ambiente
            </h1>
            <p className="mt-5 max-w-sm text-sm font-light leading-loose text-muted-foreground md:text-base">
              Mármol, travertino, granito y piedra noble: cada mesa, única.
            </p>
          </Reveal>

          {/*
            Misma estructura de grilla que Baños:
            auto-rows-[200px] mobile / auto-rows-[300px] desktop
            gap-1, grid-cols-2 mobile / grid-cols-4 desktop
            dense para que el layout sea compacto sin huecos en mobile
          */}
          <div className="grid auto-rows-[200px] grid-cols-2 gap-1 [grid-auto-flow:dense] md:auto-rows-[300px] md:grid-cols-4">
            {MESAS_CELLS.map(({ cls, priority }, i) => (
              <GalleryCell
                key={images[i].src}
                item={images[i]}
                index={i}
                onOpen={setOpen}
                priority={priority}
                className={cls}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Proyectos a medida</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">Diseñemos tu mesa a medida</h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Link
              to="/contacto"
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Pedir un presupuesto
            </Link>
            <a
              href="https://wa.me/5491100000000"
              className="eyebrow link-underline text-muted-foreground"
            >
              o escribinos por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      {/* ── LIGHTBOX ───────────────────────────────── */}
      <Lightbox items={images} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </main>
  );
}
