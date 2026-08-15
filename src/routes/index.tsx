import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { CrossfadeCarousel } from "@/components/CrossfadeCarousel";

const heroCocina = "/images/hero-cocina.jpg";
const appBanos = "/images/app-banos.jpg";
const appCocinas = "/images/app-cocinas.jpg";
const appMobiliario = "/images/app-mobiliario.jpg";
const appRevestimientos = "/images/app-revestimientos.jpg";
const appMedida = "/images/app-medida.jpg";
const matMarmol = "/images/mat-marmol.jpg";
const matGranito = "/images/mat-granito.jpg";
const matCuarzo = "/images/mat-cuarzo.jpg";
const matTravertino = "/images/mat-travertino.jpg";
const matOnix = "/images/mat-onix.jpg";
const matPorcelanato = "/images/mat-porcelanato.jpg";
const tallerSeleccion = "/images/taller-seleccion.jpg";
const tallerPulido = "/images/taller-pulido.jpg";
const showroomImg = "/images/showroom.jpg";
// const proy1 = "/images/proy-1.jpg";
// const proy2 = "/images/proy-2.jpg";

const title = "VETTA — Casa de diseño en piedra | Marmolería de alta gama";
const description =
  "Mármol, granito, cuarzo, travertino, ónix y porcelanato trabajados a medida para cocinas, baños, mobiliario y revestimientos de alto nivel. Showroom en Buenos Aires.";

export const Route = createFileRoute("/")({
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
  component: Index,
});

const heroSlides = [
  {
    src: heroCocina,
    alt: "Isla de cocina en mármol Calacatta con veta continua",
    label: "Cocina en mármol Calacatta · Residencia privada",
  },
  {
    src: appBanos,
    alt: "Baño revestido íntegramente en travertino con bacha monolítica",
    label: "Baño en travertino · Bacha monolítica",
  },
  {
    src: appMedida,
    alt: "Barra de ónix retroiluminado en un lounge",
    label: "Ónix retroiluminado · Proyecto a medida",
  },
];

const aplicaciones = [
  {
    nombre: "Cocinas",
    images: [appCocinas, heroCocina, matMarmol],
    texto: "Mesadas de veta continua, islas monolíticas y bachas talladas en la misma piedra.",
    to: "/superficies" as const,
  },
  {
    nombre: "Baños & Wellness",
    images: [appBanos, matTravertino, showroomImg],
    texto: "Vanitorios, bañeras y hammams donde la piedra ordena el silencio.",
    to: "/banos" as const,
  },
  {
    nombre: "Mesas y mobiliario",
    images: [appMobiliario, tallerSeleccion, matGranito],
    texto: "Piezas de autor: mesas, consolas y bases talladas a mano.",
    to: "/mesas" as const,
  },
  {
    nombre: "Revestimientos y pisos",
    images: [appRevestimientos, matCuarzo, tallerPulido],
    texto: "Gran formato, juntas mínimas y despieces calculados veta por veta.",
    to: "/pisos-revestimientos" as const,
  },
  {
    nombre: "Proyectos a medida",
    images: [appMedida, matOnix, matPorcelanato],
    texto: "Del boceto del estudio a la pieza única. Sin catálogo, sin límites.",
    to: "/proyectos" as const,
  },
];

// Cada banner arranca en un índice/tiempo distinto → nunca sincronizan
const CAROUSEL_INTERVALS = [6000, 6700, 5800, 7100, 6300];
const CAROUSEL_OFFSETS = [0, 2100, 900, 3200, 1500];

const materiales = [
  {
    nombre: "Mármol",
    src: matMarmol,
    texto: "Nobleza clásica. Veta viva, brillo profundo, carácter irrepetible.",
  },
  {
    nombre: "Granito",
    src: matGranito,
    texto: "Dureza y grano mineral. Para superficies de uso intenso.",
  },
  {
    nombre: "Cuarzo y cuarcita",
    src: matCuarzo,
    texto: "Blancos serenos, resistencia extrema, homogeneidad precisa.",
  },
  {
    nombre: "Travertino",
    src: matTravertino,
    texto: "Calidez porosa y luz suave. La piedra de la calma.",
  },
  {
    nombre: "Ónix",
    src: matOnix,
    texto: "Translucidez que se enciende. Reservado para el gesto principal.",
  },
  {
    nombre: "Porcelanato",
    src: matPorcelanato,
    texto: "Gran formato técnico para superficies continuas y livianas.",
  },
];

const oficio = [
  {
    paso: "01",
    nombre: "Selección",
    texto: "Elegimos la placa junto al cliente. Cada veta define el proyecto.",
  },
  {
    paso: "02",
    nombre: "Despiece y corte",
    texto: "Planificamos el corte para que la veta continúe de plano en plano.",
  },
  {
    paso: "03",
    nombre: "Pulido y terminación",
    texto: "Pulido, apomazado, cepillado o buñas: la mano define la piel.",
  },
  {
    paso: "04",
    nombre: "Instalación",
    texto: "Montaje propio, milimétrico y silencioso, en obra terminada.",
  },
];

function Index() {
  return (
    <>
      <Hero />
      <Manifiesto />
      <Aplicaciones />
      {/* Este es un comentario en JSX */}
      <Oficio />
      <SeleccionMaterial />
      {/* <ProyectosPreview /> */}
      <Showroom />
      <ContactoCTA />
    </>
  );
}

function Hero() {
  return (
    <section className="relative h-screen-safe min-h-[600px] w-full overflow-hidden bg-charcoal">
      <div className="flex h-full snap-x snap-mandatory overflow-x-auto scroll-smooth">
        {heroSlides.map((slide, i) => (
          <figure key={slide.label} className="relative h-full w-full shrink-0 snap-center">
            <img
              src={slide.src}
              alt={slide.alt}
              width={1920}
              height={1200}
              loading={i === 0 ? "eager" : "lazy"}
              fetchPriority={i === 0 ? "high" : "auto"}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/45 to-charcoal/80" />
            <figcaption className="absolute bottom-8 right-6 hidden text-right md:block md:right-10">
              <span className="eyebrow text-stone-bone/70">{slide.label}</span>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <p className="wordmark text-stone-bone text-[1.75rem] md:text-[3rem]">Vetta</p>
        <div className="mx-auto mt-8 h-px w-16 bg-stone-bone/40" />
        <h1 className="display-xl mt-8 max-w-3xl text-4xl text-stone-bone md:text-6xl lg:text-7xl">
          La piedra tarda milenios
          <br />
          en estar lista para una casa.
        </h1>
        <p className="mt-8 max-w-md text-sm font-light leading-relaxed text-stone-bone/75 md:text-base">
          Marmolería de alta gama en Buenos Aires. Mármol, granito y piedras nobles trabajados a
          medida.
        </p>
      </div>

      <div className="absolute bottom-8 left-6 md:left-10">
        <span className="eyebrow text-stone-bone/60">Deslizá · 01 — 03</span>
      </div>
    </section>
  );
}

function Manifiesto() {
  return (
    <section className="flex h-screen-safe flex-col justify-center px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="eyebrow">Manifiesto</p>
          <h2 className="display-xl mt-10 text-3xl md:text-5xl">
            No hacemos mesadas.
            <br />
            Trabajamos la piedra.
          </h2>
          <p className="mx-auto mt-10 max-w-2xl text-base font-light leading-loose text-muted-foreground md:text-lg">
            Cada placa es un fragmento de tiempo: una veta que nadie va a repetir. Nuestro oficio es
            leerla, entenderla y decidir dónde empieza y dónde termina. Somos sastres de la piedra:
            medimos, cortamos y ajustamos hasta que la pieza pertenece a un solo lugar del mundo.
          </p>
          <div className="mx-auto mt-14 h-px w-24 bg-border" />
          <p className="eyebrow mt-8">Hecho a medida · Desde 1998</p>
        </Reveal>
      </div>
    </section>
  );
}

// Movimiento sutil de la imagen de fondo al scrollear (respeta prefers-reduced-motion).
// El scroll es el del documento normal: cada sección es un div de 100dvh apilado en
// el flujo de la página, sin contenedor de scroll ni snap propios.
function useServicioParallax(ref: React.RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ticking = false;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // -1 = sección una pantalla arriba · 0 = centrada · 1 = una pantalla abajo
      const progress = Math.max(-1, Math.min(1, rect.top / vh));
      el.style.transform = `scale(1.12) translateY(${progress * 36}px)`;
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref]);
}

function ServicioPantalla({ servicio, index }: { servicio: (typeof aplicaciones)[number]; index: number }) {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  useServicioParallax(imgWrapRef);

  return (
    <div className="relative h-screen-safe w-full overflow-hidden bg-charcoal">
      <div ref={imgWrapRef} className="absolute inset-0 will-change-transform">
        <CrossfadeCarousel
          images={servicio.images}
          alt={`${servicio.nombre} en piedra natural por VETTA`}
          priority={index === 0}
          interval={CAROUSEL_INTERVALS[index] ?? 6000}
          startOffset={CAROUSEL_OFFSETS[index] ?? 0}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-charcoal/75 via-charcoal/25 to-transparent" />

      <Link
        to={servicio.to}
        className="absolute inset-0 z-10"
        aria-label={`Ver ${servicio.nombre}`}
      />

      <Reveal
        className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-14 sm:pb-16 md:px-10 md:pb-20"
      >
        <div className="mx-auto w-full max-w-[1600px]">
          <h2
            className="font-display text-4xl font-light uppercase text-stone-bone sm:text-5xl md:text-7xl"
            style={{ letterSpacing: "0.06em" }}
          >
            {servicio.nombre}
          </h2>
          <p className="mt-4 max-w-md text-sm font-light leading-relaxed text-stone-bone/85 md:text-base">
            {servicio.texto}
          </p>
          <span className="eyebrow link-underline mt-8 inline-block text-stone-bone">
            Descubrir →
          </span>
        </div>
      </Reveal>
    </div>
  );
}

function Aplicaciones() {
  return (
    <section id="aplicaciones" className="scroll-mt-24 border-t border-border">
      {aplicaciones.map((a, i) => (
        <ServicioPantalla key={a.nombre} servicio={a} index={i} />
      ))}
    </section>
  );
}

function Materiales() {
  return (
    <section id="materiales" className="scroll-mt-24 bg-muted px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Marmoteca</p>
          <h2 className="display-xl mt-6 text-3xl md:text-5xl">Materiales</h2>
          <p className="mt-8 text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Seis familias de piedra, cientos de vetas. Trabajamos con canteras seleccionadas de
            Italia, Brasil, Turquía y Argentina.
          </p>
        </Reveal>

        <ul className="mt-16 grid grid-cols-2 gap-px bg-border md:grid-cols-3">
          {materiales.map((m, i) => (
            <Reveal
              as="li"
              key={m.nombre}
              delay={i * 80}
              className="group relative aspect-square overflow-hidden bg-background"
            >
              <img
                src={m.src}
                alt={`Textura de ${m.nombre}`}
                width={1008}
                height={1008}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 flex flex-col justify-end bg-charcoal/0 p-5 transition-colors duration-1000 group-hover:bg-charcoal/55 md:p-7">
                <div className="translate-y-2 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
                  <h3 className="font-display text-2xl font-light text-stone-bone md:text-3xl">
                    {m.nombre}
                  </h3>
                  <p className="mt-2 max-w-xs text-xs font-light leading-relaxed text-stone-bone/80 md:text-sm">
                    {m.texto}
                  </p>
                </div>
              </div>
              <span className="eyebrow absolute left-5 top-5 text-charcoal/60 transition-opacity duration-700 group-hover:opacity-0 md:left-7 md:top-7">
                {m.nombre}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Oficio() {
  return (
    <section id="taller" className="scroll-mt-24 h-screen-safe border-t border-border">
      <div className="grid h-full grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <Reveal as="figure" className="relative h-full overflow-hidden">
          <img
            src={tallerSeleccion}
            alt="Placas de mármol y granito en el depósito de VETTA"
            width={1400}
            height={1200}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>
        <Reveal
          delay={120}
          className="flex h-full items-center px-6 py-16 sm:px-10 md:px-14 md:py-0 lg:px-20"
        >
          <div className="max-w-lg">
            <p className="eyebrow">El oficio</p>
            <h2 className="display-xl mt-6 text-3xl md:text-5xl">
              Cuatro manos
              <br />y una sola veta
            </h2>
            <p className="mt-8 text-sm font-light leading-loose text-muted-foreground md:text-base">
              El taller es el corazón de VETTA. Ahí se decide el destino de cada placa: cómo se
              abre, cómo se pliega en un canto, cómo continúa la veta al girar la esquina. Nada se
              resuelve por catálogo.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function SeleccionMaterial() {
  return (
    <section id="seleccion" className="scroll-mt-24 h-screen-safe border-t border-border">
      <div className="grid h-full grid-rows-2 md:grid-cols-2 md:grid-rows-1">
        <Reveal
          as="figure"
          className="relative order-1 h-full overflow-hidden md:order-2"
        >
          <img
            src={tallerPulido}
            alt="Mano del artesano recorriendo el canto pulido de una placa de mármol"
            width={1400}
            height={1200}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </Reveal>
        <Reveal
          delay={120}
          className="order-2 flex h-full items-center overflow-y-auto px-6 py-6 sm:px-10 sm:py-10 md:order-1 md:overflow-visible md:px-14 md:py-0 lg:px-20"
        >
          <div className="max-w-lg">
            <ul className="divide-y divide-border">
              {oficio.map((o) => (
                <li
                  key={o.paso}
                  className="grid grid-cols-[auto_1fr] gap-4 py-3 first:pt-0 last:pb-0 md:gap-6 md:py-7"
                >
                  <span className="eyebrow pt-1">{o.paso}</span>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg font-light md:text-3xl">{o.nombre}</h3>
                    <p className="mt-1 text-xs font-light leading-relaxed text-muted-foreground md:mt-2 md:text-sm">
                      {o.texto}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ProyectosPreview — descomentar cuando haya imágenes reales
function ProyectosPreview() {
  return (
    <section className="border-t border-border px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Proyectos</p>
            <h2 className="display-xl mt-6 text-3xl md:text-5xl">Obras terminadas</h2>
          </div>
          <Link
            to="/proyectos"
            className="eyebrow link-underline self-start text-foreground md:self-auto"
          >
            Ver el portfolio completo →
          </Link>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          <Reveal as="figure" className="md:col-span-1 overflow-hidden">
            <img
              src={proy1}
              alt="Isla de cocina en mármol verde en un penthouse"
              width={1104}
              height={1408}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
            <figcaption className="eyebrow mt-4 block">Cocina · Mármol verde · Belgrano</figcaption>
          </Reveal>
          <Reveal as="figure" delay={120} className="md:col-span-2 overflow-hidden">
            <img
              src={proy2}
              alt="Ducha y banco revestidos en mármol gris"
              width={1408}
              height={912}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover"
            />
            <figcaption className="eyebrow mt-4 block">
              Baño principal · Mármol gris · Nordelta
            </figcaption>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
*/

function Showroom() {
  return (
    <section id="showroom" className="scroll-mt-24 h-screen-safe bg-stone-travertine/40">
      <div className="grid h-full grid-rows-2 gap-0 lg:grid-cols-2 lg:grid-rows-1 lg:items-stretch">
        <Reveal as="figure" className="h-full overflow-hidden">
          <img
            src={showroomImg}
            alt="Showroom de VETTA con muestras de piedra iluminadas y mesa central de mármol"
            width={1600}
            height={1104}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </Reveal>
        <Reveal delay={120} className="flex h-full flex-col justify-center px-6 py-20 md:px-14 md:py-28">
          <p className="eyebrow">Showroom & Marmoteca</p>
          <h2 className="display-xl mt-6 text-3xl md:text-5xl">
            Venir a tocar
            <br />
            la piedra
          </h2>
          <p className="mt-8 max-w-md text-sm font-light leading-loose text-muted-foreground md:text-base">
            Ninguna foto reemplaza la mano sobre el mármol. En nuestro showroom de Palermo exhibimos
            placas completas, terminaciones y piezas de mobiliario para elegir con precisión.
          </p>
          <address className="mt-10 space-y-1 text-sm not-italic font-light">
            <p>Av. del Libertador 4200, Palermo</p>
            <p className="text-muted-foreground">
              Lunes a viernes 9 a 18 h · Sábados con cita previa
            </p>
          </address>
          <Link
            to="/contacto"
            className="eyebrow link-underline mt-10 inline-block self-start text-foreground"
          >
            Agendar una visita →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

function ContactoCTA() {
  return (
    <section className="flex h-screen-safe flex-col justify-center bg-background px-6 py-28 md:px-10 md:py-40">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="eyebrow">Proyectos a medida</p>
        <h2 className="display-xl mt-8 text-3xl md:text-5xl">
          Contanos qué imaginás.
          <br />
          Nosotros elegimos la piedra.
        </h2>
        <div className="mt-12 flex flex-col items-center gap-6">
          <Link
            to="/contacto"
            className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-colors duration-700 hover:bg-charcoal hover:text-stone-bone"
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
  );
}
