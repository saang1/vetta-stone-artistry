import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";
import { proyectos } from "@/data/proyectos";

export const Route = createFileRoute("/proyectos/")({
  head: () => ({
    meta: [
      { title: "Proyectos a Medida | VETTA" },
      {
        name: "description",
        content:
          "Galería de proyectos en piedra natural: escaleras, muros, cocinas y baños de autor en mármol, travertino y cuarcita. Buenos Aires.",
      },
    ],
  }),
  component: ProyectosPage,
});

const lightboxItems: LightboxItem[] = proyectos.map((p) => ({
  src: p.imagen,
  alt: `${p.nombre} — ${p.material}`,
  caption: `${p.nombre} · ${p.material}`,
  width: p.formato === "pano" ? 1600 : 900,
  height: p.formato === "pano" ? 1000 : 1200,
}));

const WA_URL =
  "https://wa.me/5491100000000?text=Hola%21+Quisiera+consultar+sobre+un+proyecto+a+medida+en+piedra+natural.";

function ProyectosPage() {
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  return (
    <main className="bg-background">

      {/* ── ENCABEZADO ──────────────────────────────── */}
      <header className="px-6 pb-20 pt-36 md:px-12 md:pb-28 md:pt-52">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow">Proyectos a Medida</p>
            <h1 className="display-xl mt-8 max-w-2xl text-4xl md:text-6xl lg:text-7xl">
              La piedra
              <br />
              como gesto principal
            </h1>
            <p className="mt-8 max-w-xs text-sm font-light leading-loose text-muted-foreground">
              Una selección de obras realizadas junto a estudios de
              arquitectura y diseñadores de interiores en Buenos Aires.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── GALERÍA ─────────────────────────────────── */}
      <div className="flex flex-col gap-3 px-1 md:gap-6 md:px-2">
        {proyectos.map((p, i) => (
          <Reveal key={p.id}>
            <button
              type="button"
              onClick={() => setLightboxIdx(i)}
              aria-label={`Ampliar: ${p.nombre}`}
              className={[
                "group relative block cursor-zoom-in overflow-hidden",
                p.formato === "pano"
                  ? "h-[100dvh] w-full md:h-[88vh]"
                  : "h-[100dvh] w-full md:mx-auto md:h-[90vh] md:w-[48vw]",
              ].join(" ")}
            >
              <img
                src={p.imagen}
                alt={`${p.nombre} — ${p.material}`}
                width={p.formato === "pano" ? 1600 : 900}
                height={p.formato === "pano" ? 1000 : 1200}
                loading={i < 2 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : undefined}
                decoding={i === 0 ? "sync" : "async"}
                className="h-full w-full object-cover transition-transform duration-[2200ms] ease-out group-hover:scale-[1.022]"
              />

              {/* gradient overlay + label */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/70 via-charcoal/25 to-transparent px-8 pb-10 pt-40">
                <p className="eyebrow text-stone-bone/90">
                  {p.nombre}&ensp;·&ensp;{p.material}
                </p>
              </div>

              {/* numero discreto top-right */}
              <span className="pointer-events-none absolute right-6 top-6 font-display text-[0.6rem] font-light tracking-[0.3em] text-stone-bone/40 md:right-8 md:top-8">
                {String(p.id).padStart(2, "0")}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      {/* ── CTA FINAL ───────────────────────────────── */}
      <section className="border-t border-border px-6 py-28 text-center md:px-10 md:py-40">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow">¿Imaginaste algo así?</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">
            Hacemos tu proyecto
            <br />a medida
          </h2>
          <p className="mx-auto mt-8 max-w-sm text-sm font-light leading-loose text-muted-foreground">
            Desde la selección de la placa en cantera hasta la instalación
            final. Trabajamos con estudios de arquitectura y clientes particulares.
          </p>
          <div className="mt-12 flex flex-col items-center gap-6">
            <a
              href={WA_URL}
              className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-all duration-700 hover:bg-charcoal hover:text-stone-bone"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </Reveal>
      </section>

      <Lightbox
        items={lightboxItems}
        index={lightboxIdx}
        onClose={() => setLightboxIdx(null)}
        onIndexChange={setLightboxIdx}
      />
    </main>
  );
}
