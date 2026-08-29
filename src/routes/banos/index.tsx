import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { GalleryCell } from "@/components/GalleryCell";
import { TODOS_LOS_ITEMS, TODAS_LAS_CELDAS } from "@/data/banos";

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
