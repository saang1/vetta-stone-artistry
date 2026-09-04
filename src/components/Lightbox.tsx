import { useCallback, useEffect } from "react";

export type LightboxItem = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /**
   * Si es true, `src` apunta a un video (mp4) en vez de una imagen: la celda
   * de grilla y el lightbox lo reproducen en loop, silenciado, sin controles
   * en la grilla y con controles en el lightbox.
   */
  video?: boolean;
  /**
   * Ajusta qué parte de la imagen queda visible dentro del recorte
   * `object-cover` de la celda de grilla (no afecta el lightbox, que
   * muestra la imagen completa). Formato CSS `object-position`, ej.
   * "center 25%" para mostrar más de la parte superior.
   */
  objectPosition?: string;
  /**
   * Si está presente, la pieza está en stock y a la venta: en la grilla, el
   * hover oscurece más la imagen y muestra "Disponible" en vez de la leyenda,
   * y el click lleva a la ficha de producto en vez de abrir el lightbox.
   */
  producto?: {
    slug: string;
    precio: string;
    descripcion?: string;
  };
};

export function Lightbox({
  items,
  index,
  onClose,
  onIndexChange,
}: {
  items: LightboxItem[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (i: number) => void;
}) {
  const open = index !== null;

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      onIndexChange((index + dir + items.length) % items.length);
    },
    [index, items.length, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose, go]);

  if (index === null) return null;
  const item = items[index];
  if (!item) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={item.caption}
      className="fixed inset-0 z-100 flex flex-col bg-charcoal/96 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-5 py-5 md:px-8">
        <span className="eyebrow text-stone-bone/60">
          {String(index + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="eyebrow cursor-pointer text-stone-bone/80 transition-opacity hover:opacity-60"
        >
          Cerrar ✕
        </button>
      </div>

      <div className="flex min-h-0 flex-1 items-center justify-center px-4 md:px-16">
        {item.video ? (
          <video
            key={item.src}
            src={item.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            className="max-h-[74svh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            className="max-h-[74svh] w-auto max-w-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>

      <div
        className="flex items-center justify-between gap-6 px-5 pb-8 pt-6 md:px-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Anterior"
          className="eyebrow cursor-pointer border border-stone-bone/25 px-6 py-4 text-stone-bone/85 transition-colors duration-500 hover:bg-stone-bone hover:text-charcoal"
        >
          ← Anterior
        </button>
        <span className="eyebrow truncate text-center text-stone-bone/70">{item.caption}</span>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Siguiente"
          className="eyebrow cursor-pointer border border-stone-bone/25 px-6 py-4 text-stone-bone/85 transition-colors duration-500 hover:bg-stone-bone hover:text-charcoal"
        >
          Siguiente →
        </button>
      </div>
    </div>
  );
}
