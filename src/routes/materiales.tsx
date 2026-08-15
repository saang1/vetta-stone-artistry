import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Bloque, naturales, ingenieria } from "@/routes/superficies";
import { useCatalogoFiltrado, CatalogoGrid } from "@/routes/pisos-revestimientos/index";

const title = "Materiales — Piedra natural, de ingeniería y catálogo | VETTA";
const description =
  "Todos los materiales de VETTA en un solo lugar: cuarcitas exóticas, mármoles, granitos, travertinos, superficies de ingeniería y el catálogo completo de placas.";

export const Route = createFileRoute("/materiales")({
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
  component: Materiales,
});

function Materiales() {
  const catalogo = useCatalogoFiltrado();

  return (
    <main className="bg-background pt-28 md:pt-36">
      <section className="px-6 pb-6 text-center md:px-10">
        <Reveal>
          <p className="eyebrow">Materiales</p>
          <h1 className="display-xl mx-auto mt-8 max-w-2xl text-3xl md:text-5xl">
            Toda la piedra,
            <br />
            en un solo lugar
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm font-light leading-relaxed text-muted-foreground md:text-base">
            Piedras naturales, superficies de ingeniería y el catálogo completo de placas
            trabajadas por VETTA.
          </p>
        </Reveal>
      </section>

      <Bloque titulo="Piedras naturales" items={naturales} columnas={4} />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="hairline" />
      </div>

      <Bloque titulo="Superficies de ingeniería" items={ingenieria} columnas={3} />

      <div className="mx-auto max-w-[1600px] px-6 md:px-10">
        <div className="hairline" />
      </div>

      <section className="px-6 pb-8 pt-24 text-center md:px-10 md:pt-36">
        <Reveal>
          <h2 className="font-display text-2xl font-light uppercase tracking-[0.28em] text-charcoal md:text-4xl">
            Catálogo completo
          </h2>
        </Reveal>
      </section>

      <CatalogoGrid {...catalogo} />
    </main>
  );
}
