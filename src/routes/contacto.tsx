import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";
import { canonicalLink, ogUrlMeta } from "@/lib/seo";
const showroomImg = "/images/showroom.jpg";

const title = "Contacto y showroom | VETTA — Casa de diseño en piedra";
const description =
  "Pedí un presupuesto o agendá una visita al showroom de VETTA en Palermo, Buenos Aires. WhatsApp, email y marmoteca con placas completas.";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      ogUrlMeta("/contacto"),
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [canonicalLink("/contacto")],
  }),
  component: Contacto,
});

const aplicaciones = [
  "Cocina",
  "Baño & wellness",
  "Mesa o mobiliario",
  "Revestimientos y pisos",
  "Proyecto a medida",
];

function Contacto() {
  const [enviado, setEnviado] = useState(false);

  return (
    <>
      <header className="px-6 pb-16 pt-40 md:px-10 md:pb-20 md:pt-48">
        <div className="mx-auto max-w-[1600px]">
          <Reveal>
            <p className="eyebrow">Contacto</p>
            <h1 className="display-xl mt-8 max-w-2xl text-4xl md:text-6xl">
              Hablemos de
              <br />
              tu proyecto
            </h1>
          </Reveal>
        </div>
      </header>

      <section className="px-6 pb-28 md:px-10 md:pb-36">
        <div className="mx-auto grid max-w-[1600px] gap-16 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            {enviado ? (
              <div className="border border-border p-10">
                <p className="eyebrow">Recibido</p>
                <h2 className="display-xl mt-6 text-3xl">Gracias.</h2>
                <p className="mt-4 text-sm font-light leading-relaxed text-muted-foreground">
                  Te vamos a responder dentro de las próximas 48 horas hábiles con una primera
                  propuesta.
                </p>
              </div>
            ) : (
              <form
                className="space-y-10"
                onSubmit={(e) => {
                  e.preventDefault();
                  setEnviado(true);
                }}
              >
                <Field id="nombre" label="Nombre y apellido" />
                <Field id="email" label="Email" type="email" />
                <Field id="telefono" label="Teléfono / WhatsApp" type="tel" required={false} />

                <fieldset>
                  <legend className="eyebrow">Aplicación</legend>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {aplicaciones.map((a) => (
                      <label
                        key={a}
                        className="cursor-pointer border border-border px-5 py-3 text-xs font-light transition-colors duration-500 has-[:checked]:border-charcoal has-[:checked]:bg-charcoal has-[:checked]:text-stone-bone"
                      >
                        <input type="radio" name="aplicacion" value={a} className="sr-only" />
                        {a}
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div>
                  <label htmlFor="mensaje" className="eyebrow">
                    Contanos el proyecto
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={5}
                    className="mt-4 w-full border-0 border-b border-border bg-transparent pb-3 text-base font-light outline-none transition-colors duration-500 focus:border-charcoal"
                  />
                </div>

                <button
                  type="submit"
                  className="eyebrow border border-charcoal px-10 py-5 text-charcoal transition-colors duration-700 hover:bg-charcoal hover:text-stone-bone"
                >
                  Enviar consulta
                </button>
              </form>
            )}
          </Reveal>

          <Reveal delay={120} className="space-y-12">
            <div>
              <p className="eyebrow">Directo</p>
              <ul className="mt-5 space-y-3 text-base font-light">
                <li>
                  <a href="https://wa.me/5491100000000" className="link-underline">
                    WhatsApp +54 9 11 0000 0000
                  </a>
                </li>
                <li>
                  <a href="mailto:proyectos@vetta.com.ar" className="link-underline">
                    proyectos@vetta.com.ar
                  </a>
                </li>
                <li>
                  <a href="https://instagram.com" className="link-underline">
                    Instagram @vetta.piedra
                  </a>
                </li>
              </ul>
            </div>

            <div className="hairline" />

            <div>
              <p className="eyebrow">Showroom & marmoteca</p>
              <address className="mt-5 space-y-2 text-base font-light not-italic">
                <p>Av. del Libertador 4200, Palermo</p>
                <p>Ciudad de Buenos Aires, Argentina</p>
                <p className="text-sm text-muted-foreground">
                  Lunes a viernes 9 a 18 h · Sábados con cita previa
                </p>
              </address>
            </div>

            <figure className="overflow-hidden">
              <img
                src={showroomImg}
                alt="Interior del showroom de VETTA con muestras de piedra"
                width={1600}
                height={1104}
                loading="lazy"
                className="aspect-[3/2] w-full object-cover"
              />
            </figure>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Field({
  id,
  label,
  type = "text",
  required = true,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        className="mt-4 w-full border-0 border-b border-border bg-transparent pb-3 text-base font-light outline-none transition-colors duration-500 focus:border-charcoal"
      />
    </div>
  );
}
