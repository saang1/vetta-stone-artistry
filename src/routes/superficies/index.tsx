import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { Bloque } from "@/components/Bloque";
import { naturales, ingenieria } from "@/data/superficies";
import { canonicalLink, ogUrlMeta } from "@/lib/seo";

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
      ogUrlMeta("/superficies"),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonicalLink("/superficies")],
  }),
  component: Superficies,
});

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
