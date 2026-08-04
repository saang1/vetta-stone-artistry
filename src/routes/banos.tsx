import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Lightbox, type LightboxItem } from "@/components/Lightbox";

const title = "Baños en piedra — Inspiración | VETTA";
const description =
  "Galería editorial de baños en mármol, travertino y piedras nobles: wellness, vanitorios, revestimientos y duchas por VETTA.";

export const Route = createFileRoute("/banos")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Banos,
});

type Grupo = { titulo: string; items: LightboxItem[] };

const grupos: Grupo[] = [
  {
    titulo: "Mármol",
    items: [
      {
        src: "/images/ban-marmol-1.jpg",
        alt: "Ducha revestida en mármol Calacatta con veta continua",
        caption: "Mármol Calacatta",
        width: 900,
        height: 1350,
      },
      {
        src: "/images/ban-marmol-2.jpg",
        alt: "Baño con pared de mármol book-matched y vanitorio flotante",
        caption: "Book-matched",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/ban-marmol-3.jpg",
        alt: "Bacha tallada en una única pieza de mármol",
        caption: "Bacha monolítica",
        width: 1100,
        height: 1100,
      },
    ],
  },
  {
    titulo: "Wellness & Spa",
    items: [
      {
        src: "/images/ban-wellness-1.jpg",
        alt: "Hammam revestido en travertino con nicho en arco",
        caption: "Hammam en travertino",
        width: 900,
        height: 1350,
      },
      {
        src: "/images/ban-wellness-2.jpg",
        alt: "Sala de spa con bañera de inmersión en piedra y velas",
        caption: "Wellness",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/ban-wellness-3.jpg",
        alt: "Banco de piedra caliza con toalla de lino y bowl de piedra",
        caption: "Piedra caliza",
        width: 1100,
        height: 1100,
      },
    ],
  },
  {
    titulo: "Vanitorios",
    items: [
      {
        src: "/images/ban-vanitorio-1.jpg",
        alt: "Vanitorio monolítico en mármol gris con espejo circular",
        caption: "Mármol gris",
        width: 900,
        height: 1350,
      },
      {
        src: "/images/ban-vanitorio-2.jpg",
        alt: "Doble vanitorio en travertino con dos espejos",
        caption: "Travertino",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/ban-vanitorio-3.jpg",
        alt: "Detalle de canto de mesada de piedra con bacha de apoyo",
        caption: "Detalle de canto",
        width: 1100,
        height: 1100,
      },
    ],
  },
  {
    titulo: "Revestimientos y duchas",
    items: [
      {
        src: "/images/ban-revest-1.jpg",
        alt: "Ducha de gran formato en piedra con rejilla lineal",
        caption: "Gran formato",
        width: 900,
        height: 1350,
      },
      {
        src: "/images/ban-revest-2.jpg",
        alt: "Pared revestida en placas de piedra beige con juntas mínimas",
        caption: "Juntas mínimas",
        width: 1600,
        height: 900,
      },
      {
        src: "/images/ban-revest-3.jpg",
        alt: "Pared de mármol con buñas verticales y banco de piedra",
        caption: "Buñas talladas",
        width: 1100,
        height: 1100,
      },
    ],
  },
];

const todas: LightboxItem[] = grupos.flatMap((g) => g.items);

const spreads = [
  {
    src: "/images/ban-spread-1.jpg",
    alt: "Bañera monolítica de travertino contra una pared de mármol book-matched",
    frase: "La piedra no decora el baño: lo silencia.",
    afterGroup: 0,
  },
  {
    src: "/images/ban-spread-2.jpg",
    alt: "Wet room de piedra con lluvia y haces de luz entre el vapor",
    frase: "Agua, vapor y una superficie que recuerda al tiempo.",
    afterGroup: 2,
  },
];

function Banos() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <main className="bg-background">
      <Hero />

      {grupos.map((grupo, gi) => {
        const offset = grupos.slice(0, gi).reduce((n, g) => n + g.items.length, 0);
        const spread = spreads.find((s) => s.afterGroup === gi);
        return (
          <div key={grupo.titulo}>
            {gi > 0 && (
              <div className="mx-auto max-w-[1600px] px-6 md:px-10">
                <div className="hairline" />
              </div>
            )}

            <section className="px-3 py-20 md:px-6 md:py-32">
              <Reveal className="text-center">
                <h2 className="eyebrow text-charcoal">{grupo.titulo}</h2>
              </Reveal>

              <div className="mx-auto mt-14 max-w-[1600px] columns-1 gap-2 sm:columns-2 lg:columns-3">
                {grupo.items.map((item, ii) => (
                  <button
                    key={item.src}
                    type="button"
                    onClick={() => setOpen(offset + ii)}
                    aria-label={`Ampliar: ${item.caption}`}
                    className="group mb-2 block w-full cursor-pointer overflow-hidden break-inside-avoid text-left"
                  >
                    <span className="relative block overflow-hidden">
                      <img
                        src={item.src}
                        alt={item.alt}
                        width={item.width}
                        height={item.height}
                        loading="lazy"
                        className="w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.04]"
                      />
                      <span className="absolute inset-0 bg-charcoal/0 transition-colors duration-1000 group-hover:bg-charcoal/25" />
                      <span className="eyebrow absolute bottom-5 left-5 translate-y-2 text-stone-bone opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                        {item.caption}
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </section>

            {spread && <Spread {...spread} />}
          </div>
        );
      })}

      <CTA />

      <Lightbox items={todas} index={open} onClose={() => setOpen(null)} onIndexChange={setOpen} />
    </main>
  );
}

function Hero() {
  return (
    <section className="px-3 pt-28 md:px-6 md:pt-36">
      <Reveal as="figure" className="relative overflow-hidden">
        <img
          src="/images/ban-hero.jpg"
          alt="Baño revestido íntegramente en mármol con bañera monolítica de piedra"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="aspect-[16/10] w-full object-cover md:aspect-[16/8]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-charcoal/10 to-transparent" />
        <figcaption className="absolute inset-x-0 bottom-0 px-6 pb-10 text-center md:pb-16">
          <p className="eyebrow text-stone-bone/75">Inspiración</p>
          <h1 className="display-xl mt-6 text-3xl text-stone-bone md:text-6xl">
            El baño como refugio de piedra
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-sm font-light text-stone-bone/80 md:text-base">
            Una selección de ambientes donde el mármol, el travertino y la luz hacen todo el trabajo.
          </p>
        </figcaption>
      </Reveal>
    </section>
  );
}

function Spread({ src, alt, frase }: { src: string; alt: string; frase: string }) {
  return (
    <Reveal as="figure" className="relative overflow-hidden">
      <img src={src} alt={alt} width={1920} height={1000} loading="lazy" className="aspect-[16/10] w-full object-cover md:aspect-[16/7]" />
      <div className="absolute inset-0 bg-charcoal/30" />
      <figcaption className="absolute inset-0 flex items-center justify-center px-8">
        <p className="display-xl max-w-2xl text-center text-2xl text-stone-bone md:text-5xl">{frase}</p>
      </figcaption>
    </Reveal>
  );
}

function CTA() {
  return (
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
            className="eyebrow bg-terracotta px-10 py-5 text-stone-bone transition-opacity duration-700 hover:opacity-85"
          >
            Hablemos de tu proyecto
          </Link>
          <a href="https://wa.me/5491100000000" className="eyebrow link-underline text-muted-foreground">
            o escribinos por WhatsApp
          </a>
        </div>
      </Reveal>
    </section>
  );
}
