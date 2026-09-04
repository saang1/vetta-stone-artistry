import { Link } from "@tanstack/react-router";
import { VettaLogo } from "@/components/VettaLogo";

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
            <p className="eyebrow text-stone-bone/50">Showroom</p>
            <address className="mt-5 space-y-3 text-sm not-italic text-stone-bone/85">
              <p>
                Av. del Libertador 4200
                <br />
                Palermo, Buenos Aires
              </p>
              <p>
                Lunes a viernes, 9 a 18 h<br />
                Sábados con cita previa
              </p>
            </address>
          </div>
          <div>
            <p className="eyebrow text-stone-bone/50">Contacto</p>
            <ul className="mt-5 space-y-3 text-sm text-stone-bone/85">
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
