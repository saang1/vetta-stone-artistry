import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { VettaLogo } from "@/components/VettaLogo";
import { waLink } from "@/lib/whatsapp";

const links = [
  { label: "Aplicaciones", href: "/#aplicaciones" },
  { label: "El taller", href: "/#taller" },
  { label: "Showroom", href: "/#showroom" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-5 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="min-w-0 shrink-0 text-foreground lg:justify-self-start"
          aria-label="VETTA — inicio"
        >
          <VettaLogo className="h-4 w-auto md:h-[1.75rem]" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex lg:justify-self-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="eyebrow link-underline text-muted-foreground transition-colors duration-700 hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/materiales"
            className="eyebrow link-underline text-muted-foreground transition-colors duration-700 hover:text-foreground"
          >
            Materiales
          </Link>
          <Link
            to="/proyectos"
            className="eyebrow link-underline text-muted-foreground transition-colors duration-700 hover:text-foreground"
          >
            Proyectos
          </Link>
          <Link
            to="/contacto"
            className="eyebrow link-underline text-muted-foreground transition-colors duration-700 hover:text-foreground"
          >
            Contacto
          </Link>
        </nav>

        <a
          href={waLink("Hola VETTA! Los encontré por la web y quería hacer una consulta.")}
          target="_blank"
          rel="noopener noreferrer"
          className="eyebrow hidden text-foreground lg:block lg:justify-self-end"
        >
          +54 9 11 6715 0344
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className="eyebrow shrink-0 text-foreground lg:hidden"
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border bg-background px-6 pb-10 pt-6 lg:hidden">
          <ul className="space-y-5">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl font-light text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                to="/materiales"
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-light text-foreground"
              >
                Materiales
              </Link>
            </li>
            <li>
              <Link
                to="/proyectos"
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-light text-foreground"
              >
                Proyectos
              </Link>
            </li>
            <li>
              <Link
                to="/contacto"
                onClick={() => setOpen(false)}
                className="font-display text-3xl font-light text-foreground"
              >
                Contacto
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
