import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

const proy1 = "/images/proy-1.jpg";
const proy2 = "/images/proy-2.jpg";
const proy3 = "/images/proy-3.jpg";
const proy4 = "/images/proy-4.jpg";
const appCocinas = "/images/app-cocinas.jpg";
const appMobiliario = "/images/app-mobiliario.jpg";
const appRevestimientos = "/images/app-revestimientos.jpg";
const appMedida = "/images/app-medida.jpg";

const title = "Proyectos | VETTA — Marmolería de alta gama";
const description =
  "Portfolio de obras en piedra natural de VETTA: cocinas, baños, mobiliario y revestimientos en mármol, granito, travertino y ónix en Buenos Aires.";

export const Route = createFileRoute("/proyectos")({
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
  component: Proyectos,
});

type Obra = {
  src: string;
  alt: string;
  espacio: string;
  material: string;
  lugar: string;
  span: string;
  ratio: string;
  w: number;
  h: number;
};

const obras: Obra[] = [
  {
    src: proy1,
    alt: "Isla de cocina en mármol verde con vista a la ciudad",
    espacio: "Cocina",
    material: "Mármol Verde Alpi",
    lugar: "Belgrano, CABA",
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
    w: 1104,
    h: 1408,
  },
  {
    src: proy2,
    alt: "Ducha revestida en mármol gris con banco monolítico",
    espacio: "Baño principal",
    material: "Mármol Bardiglio",
    lugar: "Nordelta",
    span: "md:col-span-7 md:mt-24",
    ratio: "aspect-[16/10]",
    w: 1408,
    h: 912,
  },
  {
    src: proy4,
    alt: "Hogar con marco de mármol en un living minimalista",
    espacio: "Living",
    material: "Mármol Calacatta",
    lugar: "Recoleta, CABA",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
    w: 1408,
    h: 912,
  },
  {
    src: proy3,
    alt: "Mostrador monolítico de travertino en un lobby",
    espacio: "Lobby corporativo",
    material: "Travertino Navona",
    lugar: "Puerto Madero",
    span: "md:col-span-5 md:mt-24",
    ratio: "aspect-[4/5]",
    w: 1104,
    h: 1408,
  },
  {
    src: appMedida,
    alt: "Barra de ónix retroiluminado en un lounge oscuro",
    espacio: "Bar de autor",
    material: "Ónix Miel",
    lugar: "Palermo, CABA",
    span: "md:col-span-6",
    ratio: "aspect-[3/2]",
    w: 1600,
    h: 1104,
  },
  {
    src: appMobiliario,
    alt: "Mesa de comedor con tapa de piedra gris",
    espacio: "Mesa de comedor",
    material: "Piedra Grigio",
    lugar: "San Isidro",
    span: "md:col-span-6 md:mt-16",
    ratio: "aspect-[3/2]",
    w: 1600,
    h: 1104,
  },
  {
    src: appRevestimientos,
    alt: "Hall revestido en piedra de gran formato",
    espacio: "Hall de acceso",
    material: "Gran formato",
    lugar: "Pilar",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
    w: 1600,
    h: 1104,
  },
  {
    src: appCocinas,
    alt: "Mesada de granito en una cocina con carpintería de madera",
    espacio: "Cocina de campo",
    material: "Granito Fantasy",
    lugar: "Cañuelas",
    span: "md:col-span-5 md:mt-16",
    ratio: "aspect-[4/5]",
    w: 1600,
    h: 1104,
  },
];

function Proyectos() {
  return (
    <>
      <header className="px-6 pb-16 pt-40 md:px-10 md:pb-24 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow">Portfolio</p>
            <h1 className="display-xl mt-8 max-w-3xl text-4xl md:text-6xl lg:text-7xl">
              Obras donde la piedra
              <br />
              lleva la voz
            </h1>
            <p className="mt-10 max-w-xl text-sm font-light leading-loose text-muted-foreground md:text-base">
              Una selección de proyectos realizados junto a estudios de arquitectura y diseñadores de interiores en
              Buenos Aires y alrededores.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="px-6 pb-28 md:px-10 md:pb-40">
        <ul className="mx-auto grid max-w-[1600px] grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-12">
          {obras.map((obra, i) => (
            <Reveal as="li" key={obra.espacio} delay={(i % 2) * 100} className={obra.span}>
              <figure className="group">
                <div className="overflow-hidden">
                  <img
                    src={obra.src}
                    alt={obra.alt}
                    width={obra.w}
                    height={obra.h}
                    loading="lazy"
                    className={`${obra.ratio} w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.03]`}
                  />
                </div>
                <figcaption className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 border-t border-border pt-4">
                  <div className="min-w-0">
                    <h2 className="font-display text-2xl font-light">{obra.espacio}</h2>
                    <p className="eyebrow mt-2 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                      {obra.material}
                    </p>
                  </div>
                  <span className="eyebrow shrink-0 pt-2">{obra.lugar}</span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="border-t border-border px-6 py-24 text-center md:px-10 md:py-32">
        <Reveal className="mx-auto max-w-2xl">
          <p className="eyebrow">Tu proyecto</p>
          <h2 className="display-xl mt-8 text-3xl md:text-5xl">¿Empezamos por la placa?</h2>
          <Link
            to="/contacto"
            className="eyebrow mt-12 inline-block border border-charcoal px-10 py-5 text-charcoal transition-colors duration-700 hover:bg-charcoal hover:text-stone-bone"
          >
            Pedir un presupuesto
          </Link>
        </Reveal>
      </section>
    </>
  );
}
