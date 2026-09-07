import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox } from "@/components/Lightbox";
import { GalleryCell } from "@/components/GalleryCell";
import { MESAS_ITEMS, MESAS_CELLS } from "@/data/mesas";
import { canonicalLink, ogUrlMeta } from "@/lib/seo";

const SEO_TITLE = "Mesas a medida — Galería de inspiración | VETTA";
const SEO_DESC =
  "Galería editorial de mesas de mármol, travertino y piedra noble a medida por VETTA.";

export const Route = createFileRoute("/mesas/")({
  head: () => ({
    meta: [
      { title: SEO_TITLE },
      { name: "description", content: SEO_DESC },
      { property: "og:title", content: SEO_TITLE },
      { property: "og:description", content: SEO_DESC },
      { property: "og:type", content: "website" },
      ogUrlMeta("/mesas"),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonicalLink("/mesas")],
  }),
  component: MesasPage,
});

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
                key={MESAS_ITEMS[i].src}
                item={MESAS_ITEMS[i]}
                index={i}
                onOpen={setOpen}
                priority={priority}
                className={cls}
                productoRoute="/mesas/$producto"
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
      <Lightbox
        items={MESAS_ITEMS}
        index={open}
        onClose={() => setOpen(null)}
        onIndexChange={setOpen}
      />
    </main>
  );
}
