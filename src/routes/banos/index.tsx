import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { GalleryCell } from "@/components/GalleryCell";

const SEO_TITLE = "Baños & Wellness — Galería editorial | VETTA";
const SEO_DESC =
  "Galería editorial de baños en mármol y wellness: vanitorios, revestimientos y espacios de piedra nobles por VETTA.";

export const Route = createFileRoute("/banos/")({
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
  component: BanosPage,
});

// ─── DATA ────────────────────────────────────────────────────────────────────
//
// Para poner una pieza en stock y a la venta: agregále el campo `producto`
// (ver ejemplo comentado abajo). Ahí mismo el hover pasa a mostrar
// "Disponible" y el click lleva a la ficha en vez de abrir el lightbox.
//
//   producto: {
//     slug: "banera-monolitica-marmol",   // define la URL: /banos/{slug}
//     precio: "USD 2.400",                // como quieran mostrarlo
//     descripcion: "Bañera tallada en una sola pieza de mármol Calacatta.",
//   },

export const banosItems: LightboxItem[] = [
  {
    src: "/images/ban-hero.jpg",
    alt: "Baño revestido íntegramente en mármol con bañera monolítica de piedra",
    caption: "Bañera monolítica",
    width: 1920,
    height: 1088,
    // EJEMPLO — reemplazar por datos reales o borrar el campo `producto`.
    producto: {
      slug: "banera-monolitica-marmol",
      precio: "USD 2.800",
      descripcion:
        "Bañera tallada en una sola pieza de mármol, sin uniones ni juntas. Pieza única, lista para instalar.",
    },
  },
  {
    src: "/images/ban-marmol-1.jpg",
    alt: "Ducha revestida en mármol Calacatta con veta continua",
    caption: "Mármol Calacatta",
    width: 900,
    height: 1350,
  },
  {
    src: "/images/ban-vanitorio-1.jpg",
    alt: "Vanitorio monolítico en mármol gris con espejo circular",
    caption: "Mármol gris",
    width: 900,
    height: 1350,
  },
  {
    src: "/images/ban-marmol-3.jpg",
    alt: "Bacha tallada en una única pieza de mármol",
    caption: "Bacha monolítica",
    width: 1100,
    height: 1100,
    // EJEMPLO — reemplazar por datos reales o borrar el campo `producto`.
    producto: {
      slug: "bacha-monolitica-marmol",
      precio: "USD 890",
      descripcion: "Bacha tallada en una única pieza de mármol. Stock limitado, entrega inmediata.",
    },
  },
  {
    src: "/images/ban-vanitorio-2.jpg",
    alt: "Doble vanitorio en travertino con dos espejos",
    caption: "Travertino",
    width: 1600,
    height: 900,
  },
  {
    src: "/images/ban-marmol-2.jpg",
    alt: "Baño con pared de mármol book-matched y vanitorio flotante",
    caption: "Book-matched",
    width: 1600,
    height: 900,
  },
];

export const wellnessItems: LightboxItem[] = [
  {
    src: "/images/ban-wellness-1.jpg",
    alt: "Hammam revestido en travertino con nicho en arco",
    caption: "Hammam travertino",
    width: 900,
    height: 1350,
  },
  {
    src: "/images/ban-spread-1.jpg",
    alt: "Bañera monolítica de travertino contra pared de mármol book-matched",
    caption: "Bañera de inmersión",
    width: 1920,
    height: 1000,
  },
  {
    src: "/images/ban-wellness-3.jpg",
    alt: "Banco de piedra caliza con toalla de lino y bowl de piedra",
    caption: "Piedra caliza",
    width: 1100,
    height: 1100,
  },
  {
    src: "/images/ban-revest-3.jpg",
    alt: "Pared de mármol con buñas verticales y banco de piedra",
    caption: "Buñas talladas",
    width: 1100,
    height: 1100,
  },
  {
    src: "/images/ban-revest-1.jpg",
    alt: "Ducha de gran formato en piedra con rejilla lineal",
    caption: "Gran formato",
    width: 900,
    height: 1350,
  },
  {
    src: "/images/ban-spread-2.jpg",
    alt: "Wet room de piedra con lluvia y haces de luz entre el vapor",
    caption: "Wet room",
    width: 1920,
    height: 1000,
  },
  {
    src: "/images/ban-wellness-2.jpg",
    alt: "Sala de spa con bañera de inmersión en piedra y velas",
    caption: "Sala de spa",
    width: 1600,
    height: 900,
    // EJEMPLO — reemplazar por datos reales o borrar el campo `producto`.
    producto: {
      slug: "banera-inmersion-spa",
      precio: "USD 3.200",
      descripcion: "Bañera de inmersión en piedra natural, pensada para espacios de spa y wellness.",
    },
  },
];

// ─── GRID CONFIG ─────────────────────────────────────────────────────────────
//
// Baños desktop (4 cols, auto-rows 300px):
//   col: 1    2    3    4
//   r1: [A A] [B ] [C  ]
//   r2: [A A] [B ] [D  ]
//   r3: [E E] [F F      ]
//
// Baños mobile (2 cols, auto-rows 200px):
//   r1: [A A]  ← full-width
//   r2: [B] [C]
//   r3: [B] [D]
//   r4: [E E]
//   r5: [F F]

const BANOS_CELLS = [
  // A — hero featured, 2×2 desktop / full-width 1-row mobile
  { item: banosItems[0], priority: true,  cls: "col-span-2 row-span-1 md:col-span-2 md:row-span-2" },
  // B — portrait tall, 1×2
  { item: banosItems[1], priority: true,  cls: "col-span-1 row-span-2" },
  // C — small top-right
  { item: banosItems[2], priority: false, cls: "col-span-1 row-span-1" },
  // D — small bottom-right
  { item: banosItems[3], priority: false, cls: "col-span-1 row-span-1" },
  // E — panoramic bottom-left, 2×1
  { item: banosItems[4], priority: false, cls: "col-span-2 row-span-1" },
  // F — panoramic bottom-right, 2×1
  { item: banosItems[5], priority: false, cls: "col-span-2 row-span-1" },
] as const;

//
// Wellness desktop (4 cols, auto-rows 300px):
//   col: 1    2    3    4
//   r1: [A ] [B B B     ]   ← A=portrait 1×2, B=spread 3×1
//   r2: [A ] [C ] [D ] [E]
//   r3: [F F] [G G      ]
//
// Wellness mobile (2 cols, auto-rows 200px, dense):
//   r1: [A] [C]  r2: [A] [D]  r3: [B B]  r4: [E E]  r5: [F F]  r6: [G G]

const WELLNESS_CELLS = [
  // A — portrait tall, 1×2
  { item: wellnessItems[0], priority: false, cls: "col-span-1 row-span-2" },
  // B — panoramic spread, 3×1 desktop / full-width mobile
  { item: wellnessItems[1], priority: false, cls: "col-span-2 row-span-1 md:col-span-3" },
  // C — square
  { item: wellnessItems[2], priority: false, cls: "col-span-1 row-span-1" },
  // D — square
  { item: wellnessItems[3], priority: false, cls: "col-span-1 row-span-1" },
  // E — portrait on desktop, full-width on mobile
  { item: wellnessItems[4], priority: false, cls: "col-span-2 row-span-1 md:col-span-1" },
  // F — panoramic, 2×1
  { item: wellnessItems[5], priority: false, cls: "col-span-2 row-span-1" },
  // G — panoramic, 2×1
  { item: wellnessItems[6], priority: false, cls: "col-span-2 row-span-1" },
] as const;

// ─── GALERÍA UNIFICADA — baños + wellness/spa, sin separación ────────────────
export const TODOS_LOS_ITEMS: LightboxItem[] = [...banosItems, ...wellnessItems];
const TODAS_LAS_CELDAS = [...BANOS_CELLS, ...WELLNESS_CELLS];

// ─── PAGE ────────────────────────────────────────────────────────────────────

function BanosPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="bg-background pt-28 md:pt-36">

      {/* ── GALERÍA ──────────────────────────────────────────── */}
      <section aria-label="Baños" className="px-6 md:px-10">
        <div className="mx-auto max-w-[1600px]">

          <Reveal className="mb-14 md:mb-20">
            <p className="eyebrow text-charcoal">Baños</p>
            <h1 className="display-xl mt-5 max-w-lg text-4xl md:text-6xl">
              El baño como refugio de piedra
            </h1>
            <p className="mt-5 max-w-sm text-sm font-light leading-loose text-muted-foreground md:text-base">
              Mármol, travertino y luz: ambientes donde la piedra lo hace todo.
            </p>
          </Reveal>

          <div className="grid auto-rows-[200px] grid-cols-2 gap-1 [grid-auto-flow:dense] md:auto-rows-[300px] md:grid-cols-4">
            {TODAS_LAS_CELDAS.map(({ item, priority, cls }, i) => (
              <GalleryCell
                key={item.src}
                item={item}
                index={i}
                onOpen={setOpenIndex}
                priority={priority}
                className={cls}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Proyectos a medida</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">
            ¿Te inspiraste?
            <br />
            Diseñemos tu baño a medida
          </h2>
          <div className="mt-12 flex flex-col items-center gap-6">
            <Link
              to="/contacto"
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Hablemos de tu proyecto
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

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <Lightbox
        items={TODOS_LOS_ITEMS}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onIndexChange={setOpenIndex}
      />
    </main>
  );
}
