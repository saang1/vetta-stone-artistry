import type { LightboxItem } from "@/components/Lightbox";

// ─── DATA ────────────────────────────────────────────────────────────────────
//
// Para poner una mesa en stock y a la venta: agregále el campo `producto`
// (ver ejemplo comentado abajo). Ahí mismo el hover pasa a mostrar
// "Disponible" y el click lleva a la ficha en vez de abrir el lightbox.
// Misma convención que /src/data/banos.ts.
//
//   producto: {
//     slug: "mesa-marmol-calacatta",       // define la URL: /mesas/{slug}
//     precio: "USD 2.400",                 // como quieran mostrarlo
//     descripcion: "Mesa de comedor tallada en una sola placa de mármol Calacatta.",
//   },
//
// Convención de nombres de archivo en /public/images/mesas/:
//   *-vert-*  →  vertical 3:4   (col-span-1, row-span-2)
//   *-pano-*  →  panorámica 16:9 (col-span-2, row-span-1)
//   *-sq-*    →  cuadrada 1:1   (col-span-1, row-span-1)
//
// Para cambiar el ritmo del mosaico, reordenar los objetos de este array.
// El span de cada celda está declarado en MESAS_CELLS (más abajo), pareado
// por índice con MESAS_ITEMS.

export const MESAS_ITEMS: LightboxItem[] = [
  // [0] vert-01 — portrait tall (posición A en la grilla)
  {
    src: "/images/mesas/mesa-vert-01.png",
    alt: "Mesa de mármol Calacatta con veta continua",
    caption: "Mármol Calacatta",
    width: 900,
    height: 1200,
    // EJEMPLO — reemplazar por datos reales o borrar el campo `producto`.
    producto: {
      slug: "mesa-marmol-calacatta",
      precio: "USD 2.400",
      descripcion: "Mesa de comedor tallada en una sola placa de mármol Calacatta. Pieza única.",
    },
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
    // EJEMPLO — reemplazar por datos reales o borrar el campo `producto`.
    producto: {
      slug: "mesa-ratona-marmol-crema",
      precio: "USD 980",
      descripcion: "Mesa ratona de mármol crema con base de acero. Stock limitado.",
    },
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

export const MESAS_CELLS: Array<{ cls: string; priority?: boolean }> = [
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
