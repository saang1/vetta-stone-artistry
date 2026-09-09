import { Link } from "@tanstack/react-router";
import { VettaLogo } from "@/components/VettaLogo";
import { waLink } from "@/lib/whatsapp";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal px-6 pb-10 pt-20 text-stone-bone md:px-10 md:pt-28">
      <div className="mx-auto max-w-[1600px]">
        <VettaLogo className="h-6 w-auto md:h-7" />
        <p className="mt-6 max-w-md font-display text-2xl font-light leading-snug text-stone-bone/70">
          Casa de diseño en piedra. Buenos Aires, Argentina.
        </p>

        <div className="mt-16 grid gap-12 border-t border-stone-bone/15 pt-12 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <p className="eyebrow text-stone-bone/50">Navegación</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-bone/85">
              <li>
                <a href="/#aplicaciones" className="link-underline">
                  Aplicaciones
                </a>
              </li>
              <li>
                <a href="/#taller" className="link-underline">
                  El taller
                </a>
              </li>
              <li>
                <Link to="/proyectos" className="link-underline">
                  Proyectos
                </Link>
              </li>
              <li>
                <a href="/#showroom" className="link-underline">
                  Showroom
                </a>
              </li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-stone-bone/50">Materiales</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-bone/85">
              <li>Mármol</li>
              <li>Granito</li>
              <li>Cuarzo y cuarcita</li>
              <li>Travertino</li>
              <li>Ónix</li>
              <li>Porcelanato</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow text-stone-bone/50">Contacto</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-bone/85">
              <li>
                <a
                  href={waLink("Hola VETTA! Los encontré por la web y quería hacer una consulta.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline"
                >
                  WhatsApp +54 9 11 6715 0344
                </a>
              </li>
              <li>
                <a href="mailto:martingrupovetta@gmail.com" className="link-underline">
                  martingrupovetta@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/conceptovetta/" className="link-underline">
                  Instagram @conceptovetta
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-stone-bone/15 pt-8 text-xs text-stone-bone/40 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} VETTA. Todos los derechos reservados.</p>
          <p className="eyebrow text-stone-bone/40">
            Mármol · Granito · Cuarzo · Travertino · Ónix
          </p>
        </div>
      </div>
    </footer>
  );
}
