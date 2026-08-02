import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const links = [
  { label: "Aplicaciones", href: "/#aplicaciones" },
  { label: "Materiales", href: "/#materiales" },
  { label: "El taller", href: "/#taller" },
  { label: "Showroom", href: "/#showroom" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const light = !scrolled && !open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        light ? "bg-transparent" : "border-b border-border bg-background/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto grid max-w-[1600px] grid-cols-[minmax(0,1fr)_auto] items-center gap-6 px-6 py-5 md:px-10 lg:grid-cols-[1fr_auto_1fr]">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className={`wordmark min-w-0 truncate text-[0.95rem] transition-colors duration-700 lg:justify-self-start ${
            light ? "text-stone-bone" : "text-foreground"
          }`}
          aria-label="VETTA — inicio"
        >
          Vetta
        </Link>

        <nav className="hidden items-center gap-8 lg:flex lg:justify-self-center">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className={`eyebrow link-underline transition-colors duration-700 ${
                light ? "text-stone-bone/85 hover:text-stone-bone" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {l.label}
            </a>
          ))}
          <Link
            to="/proyectos"
            className={`eyebrow link-underline transition-colors duration-700 ${
              light ? "text-stone-bone/85 hover:text-stone-bone" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Proyectos
          </Link>
          <Link
            to="/contacto"
            className={`eyebrow link-underline transition-colors duration-700 ${
              light ? "text-stone-bone/85 hover:text-stone-bone" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Contacto
          </Link>
        </nav>

        <a
          href="https://wa.me/5491100000000"
          className={`eyebrow hidden transition-colors duration-700 lg:block lg:justify-self-end ${
            light ? "text-stone-bone" : "text-foreground"
          }`}
        >
          +54 9 11 0000 0000
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Abrir menú"
          className={`eyebrow shrink-0 lg:hidden ${light ? "text-stone-bone" : "text-foreground"}`}
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
