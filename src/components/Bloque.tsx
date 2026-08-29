import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import type { Superficie } from "@/data/superficies";

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
