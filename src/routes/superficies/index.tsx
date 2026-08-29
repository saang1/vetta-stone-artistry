import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

const title = "Superficies — Piedras naturales y de ingeniería | VETTA";
const description =
  "Cuarcitas exóticas, mármoles, granitos y travertinos, además de superficies de ingeniería: Neolith, Purastone Prima y Purastone.";

export const Route = createFileRoute("/superficies/")({
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
  component: Superficies,
});

export type Superficie = { nombre: string; src: string; slug?: string };

export const naturales: Superficie[] = [
  { nombre: "Cuarcitas exóticas", src: "/images/sup-cuarcitas.jpg" },
  { nombre: "Mármoles", src: "/images/sup-marmoles.jpg" },
  { nombre: "Granitos", src: "/images/sup-granitos.jpg" },
  { nombre: "Travertinos", src: "/images/sup-travertinos.jpg" },
];

// Cada marca con slug lleva a su propio catálogo en /superficies/$marca.
export const ingenieria: Superficie[] = [
  {
    nombre: "Neolith",
    src: "/images/cocinas/Neolith/Calacatta_Luxe_PC4L1DU061_F1.jpg",
    slug: "neolith",
  },
  {
    nombre: "Purastone Prima",
    src: "/images/cocinas/Purastone Prima/Absolute_Black__PC4PPBM121_T2.webp",
    slug: "purastone-prima",
  },
  {
    nombre: "Purastone",
    src: "/images/cocinas/Purastone/Arabescato_Cervaiole_PC3P35P12J_T1.webp",
    slug: "purastone",
  },
];

function Superficies() {
  return (
    <main className="bg-background">
      <section className="px-6 pt-32 pb-6 text-center md:px-10 md:pt-44">
        <Reveal>
          <p className="eyebrow">Superficies</p>
          <h1 className="display-xl mx-auto mt-8 max-w-2xl text-3xl md:text-5xl">
            Todo lo que puede ser
            <br />
            una superficie
          </h1>
        </Reveal>
      </section>

      <Bloque titulo="Piedras naturales" items={naturales} columnas={4} />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="hairline" />
      </div>

      <Bloque titulo="Superficies de ingeniería" items={ingenieria} columnas={3} />
    </main>
  );
}

export function Bloque({
  titulo,
  items,
  columnas,
}: {
  titulo: string;
  items: Superficie[];
  columnas: 3 | 4;
}) {
  return (
    <section className="px-6 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="text-center">
          <h2 className="font-display text-2xl font-light uppercase tracking-[0.28em] text-charcoal md:text-4xl">
            {titulo}
          </h2>
          <Link
            to="/superficies"
            className="eyebrow link-underline mt-8 inline-block text-terracotta"
          >
            Ver todas las superficies →
          </Link>
        </Reveal>

        <ul
          className={`mt-20 grid grid-cols-1 gap-x-10 gap-y-16 sm:grid-cols-2 ${
            columnas === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {items.map((item, i) => {
            const contenido = (
              <>
                <span className="block overflow-hidden">
                  <img
                    src={item.src}
                    alt={`Placa de ${item.nombre} en el showroom de VETTA`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className={`aspect-[4/3] w-full ${item.slug ? "object-contain" : "object-cover"} transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]`}
                  />
                </span>
                <span className="mt-6 block text-xs font-semibold uppercase tracking-[0.24em] text-charcoal transition-opacity duration-700 group-hover:opacity-60 md:text-sm">
                  {item.nombre}
                </span>
              </>
            );

            return (
              <Reveal as="li" key={item.nombre} delay={i * 80}>
                {item.slug ? (
                  <Link
                    to="/superficies/$marca"
                    params={{ marca: item.slug }}
                    className="group block w-full cursor-pointer text-center"
                  >
                    {contenido}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="group block w-full cursor-pointer text-center"
                    aria-label={`${item.nombre} — catálogo próximamente`}
                  >
                    {contenido}
                  </button>
                )}
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
